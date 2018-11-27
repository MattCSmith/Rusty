const Discord = require("discord.js");

exports.run = async (client, message, args, level, user, reaction) => { // eslint-disable-line no-unused-vars
    console.log(args, "== ARGS ==")
    
    // Sub-Command handler
    if (!args[0]) sendMenu(client, message)
    if(args[0] === "submit") submitValidation(client, message, args)


};

const submitValidation = (client, message, args) => {
    const subErrors = []
    if (!args[1]) subErrors.push("You did not enter a day number!")
    if (!args[2]) subErrors.push("You did not supply a url!")
    if (!args[3]) subErrors.push("You did no enter the submission language")
    
    if (subErrors[0]){
        let errMsg = "The following errors were found:"
        subErrors.forEach(e => {
            errMsg = errMsg + `\n :x: ${e}`
        });
        message.channel.send(errMsg)
    } 
    else(message.channel.send("Basic Validation Passed!"))
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