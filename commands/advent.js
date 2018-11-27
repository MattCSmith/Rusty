const Discord = require("discord.js");
const checkURL = (args) => {
    if (!args[1]) message.channel.send("NO DAY NUMBER!")
    if (!args[2]) message.channel.send("NO URL")
    if (!args[3]) message.channel.send("NO Lang")
    else (message.channel.send("success"))
}

const submitUrl = (args) => {
    console.log("hey")
    checkURL(args)
}
exports.run = async (client, message, args, level, user, reaction) => { // eslint-disable-line no-unused-vars
    console.log(args)

    // Args Handler
    // Here we will route the sub commands
    if (!args[0]) menu.embed("Advent", message.channel)
    if (args[0] === "vc") message.channel.send(`Today's Challenge can be found here: https://adventofcode.com/2018/day/${client.timeEST().getDate()}`)
    if (args[0] === "sub") message.channel.send(`You can submit your solution by running the following command: ${client.settings.general.prefix}`)
    if (args[0] === "view") message.channel.send("You can check out solutions created by other students on the website, https://zerotomastery.io/")
    if (args[0] === "about") message.channel.send("You can find out more about Advent of Code on their website, https://adventofcode.com/")
    if (args[0] === "url") submitUrl(args)
    if (args[0] === "init") {
        await menu.embed("Advent", message.channel)
        client.sendembed(message.channel, "Aoc Stats PlaceHolder", "", "test text")
    }
    if (args[0] === "0") client.sendembed(message.channel, "Advent of Code", "", "desc", "", "red", boolean = false)

    // Menu Embed
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

    // const adventStats = new Discord.RichEmbed()
    //     .setTitle("Advent of Code Stats")
    //     .setDescription(``)
    //     .addField(`:arrows_counterclockwise: ${stats.all} Solutions`, "Total Solutions", true)
    //     .addField(`🗓 ${stats.day} Today`, "Todays Total", true)
    //     .addField(`:family_wwb:  ${stats.user} Paticipants`, "Total ZTM Paritcipants", true)
    //     .setFooter(`❇ Last Updated: ${moment(estDate).format('MMM Do - h:mm a')}`)

        console.log(client.adventStats)
};



exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["aoc"],
    permLevel: "User"
};

exports.help = {
    name: "advent",
    category: "Miscelaneous",
    description: "It... like... pings. Then Pongs. And it\"s not Ping Pong.",
    usage: "ping"
};