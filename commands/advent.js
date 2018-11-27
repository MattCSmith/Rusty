const Discord = require("discord.js");
const token = require("../tokens.json")
const mongoose = require('mongoose');



//db starts
//connection to mlab
mongoose.connect(`${token.mlabs}`, { useNewUrlParser: true });

//mlab schema 1
let codeSchema = new mongoose.Schema({
    url: String,
    dayNumber: String,
    userName: String,
    userid: String,
    langName: String,
    avatarUrl: String,
    Time: { type: Date, default: Date.now }
});

const Snippet = mongoose.model('Snippet', codeSchema);

//mlab schema 2
let userSchema = new mongoose.Schema({
    username: String,
    userid: String,
    avatarUrl: String,
    point: String
});

//initializing variables to be saved in db
let username, userid, point, langName;

let User = mongoose.model('User', userSchema);

//db ends

exports.run = async (client, message, args, level, user, reaction) => { // eslint-disable-line no-unused-vars
    console.log(args, "== ARGS ==")

    // Sub-Command handler
    if (!args[0]) sendMenu(client, message)
    if (args[0] === "submit") submitValidation(client, message, args)

    


};

const submitValidation = (client, message, args) => {
    console.log("Submit Init")
    console.log(args)
    const subErrors = []
    if (!args[1]) subErrors.push("You did not enter a day number!")
    if (!args[2]) subErrors.push("You did not supply a url!")
    if (!args[3]) subErrors.push("You did no enter the submission language")

    if (subErrors[0]) {
        let errMsg = "The following errors were found:"
        subErrors.forEach(e => {
            errMsg = errMsg + `\n :x: ${e}`
        });
        message.channel.send(errMsg)
    } else {
        //extracting url and day number from command
        let url = args[2]
        console.log("URL IS HERE", url)
        let dayNumber = Math.floor(args[1]);
        console.log(dayNumber)

        // checks if input date is of correct format
        function dateValidator(dNumber) {
            let intDay = parseInt(dNumber);
            console.log(intDay)
            if (intDay >= 1 && intDay <= 25) {
                console.log('date verified')
                return true;
            } else {
                console.log('date not verified')
                return false;
            }
        }

        // check if user is time traveller
        if (client.dateEST >= parseInt(dayNumber) && dateValidator(dayNumber)) {
            console.log('validated---')

            //////////////////////////////////////////////////////////////////

            // for Snippets collection
            let userName = message.author.username;
            let avatarUrl;
            if (message.author.avatarURL === null) {
                avatarUrl = "https://robohash.org/" + userName + message.author.id
            } else {
                avatarUrl = message.author.avatarURL;
            }

            username = message.author.username;
            userid = message.author.id;

            Snippet.findOne({ url: url }, function (err, user) {
                if (err) {
                    console.log(err);
                }
                if (user) {

                    message.reply(":copyright: URL already exists");
                    console.log("url exists")

                } else {


                    console.log("url doesn't exist")

                    Snippet.create({ dayNumber, userid, url, userName, avatarUrl }, function (err, newData) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(dayNumber);
                            console.log('data saved');
                            console.log(message.author.id);

                            //experiment code
                            User.findOne({ userid: message.author.id }, function (err, userData) {
                                if (err) {
                                    console.log(err);
                                }
                                if (userData) {
                                    console.log(userData)
                                    console.log("user exists")

                                    //check if user submits challenge within time and give points
                                    if (client.dateEST === parseInt(dayNumber)) {
                                        userData.point++;
                                    }

                                    User.findByIdAndUpdate(userData._id, { point: userData.point }, (err, updatedBlog) => {
                                        if (err) {

                                            console.log(err)
                                        } else {

                                            //rerunning advent.js
                                            advent.run()

                                            console.log('updated')
                                        }
                                    });

                                } else {
                                    console.log("user doesn't exist");
                                    console.log(message.author.username)

                                    //check if user submits challenge within time and give points
                                    if (client.dateEST === parseInt(dayNumber)) {
                                        point = 1;
                                    } else {
                                        point = 0;
                                    }

                                    User.create({ username, userid, avatarUrl, point }, function (err, newData) {
                                        if (err) {
                                            console.log(err);
                                        } else {

                                            //rerunning advent.js
                                            advent.run()

                                            console.log('user saved');
                                        }
                                    });
                                }
                            });

                        }
                    });


                    process.on('exit', (code) => {
                        console.log("Process quit with code : " + code);
                    });

                    ///////////////////////////////////////////////////////////////

                    message.reply("Thanks for submitting the url");



                }
            });


        } else if (!dateValidator(dayNumber)) {
            message.reply(":date: Please enter integer between 1-25 as dayNumber");
            message.channel.send({ embed: helpEmbed });
        } else if (client.dateEST < parseInt(dayNumber)) {
            message.reply(":alien: Time travellers not allowed");
        } else {
            message.reply(":dizzy_face: something happened");
            message.channel.send({ embed: helpEmbed });
        }


    }
}

const sendMenu = (client, message) => {
    let adventMenu = new Discord.RichEmbed()
        .setAuthor("Advent of Code")
        .setThumbnail("http://icons.iconarchive.com/icons/stevelianardo/free-christmas-flat/256/christmas-tree-icon.png")
        .setColor("B3000C")
        .setDescription("desc")
        .addField("📋 About AoC", "Find out more [here](https://adventofcode.com)", true)
        .addField(`:calendar:  Todays Challenge`, `Check it out [here](https://adventofcode.com/2018/day/${client.timeEST().getDate()})`, true)
        .addField(`:eye: View Solutions`, `ZTM solutions [here](https://adventofcode.com/2018/day/${client.timeEST().getDate()})`, true)
        .addField(":medal: View Leaderboard", "How do your [rank?](https://zerotomastery.io/events/advent-of-code.html?leaderboard)", true)
        .addBlankField()
        .addField(`🔗 Submit Solution`, '**Submit your solution using this command structure:** \n`+aoc submit <day> <url> <language>` \n**For example**\n +aoc submit 5 https://repl.it/test javascript', false)
    message.channel.send({ embed: adventMenu });
}

const mlabInit = () => {

}




exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["aoc"],
    permLevel: "User"
};

exports.help = {
    name: "advent",
    category: "Challenges",
    description: "Advent of Code Commands",
    usage: "advent"
};