const Discord = require("discord.js");

// The AboutBot command is used to display information about the bot and it contributos
// Along with the repo and test server

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "about",
    category: "Miscelaneous",
    description: "Display info about the bot and its contributors",
    usage: "about"
};

exports.run = (client, message) => { // eslint-disable-line no-unused-vars

    const contributors = [
        ["Matt", "https://github.com/MattCSmith"],
        ["Abdus", "https://github.com/thisisabdus"],
        ["notAnkur", "https://github.com/anantankur"]
    ]
    

    // Defines Embed
    let embed = new Discord.RichEmbed()
        .setAuthor(`About ZeroBot`)
        .setColor(`#e8c123`)
        .setDescription(
            "ZeroBot is a custom built bot written in JavaScript using the Discord.Js API, for the Zero To Mastery Community. ")
        .addField(` :white_check_mark:  Contributions Welcome`, "[Github Repo](https://github.com/MattCSmith/zeroBot)", true)
        .addField(` :green_heart:   Test Server`, "[Bot Testing Discord](https://discord.gg/APueghK)", true)
        .addBlankField()
        .addField("**Contributors:**", "Devs that have made this bot what it is today")

        contributors.forEach(c => {
            embed.addField(c[0], `[Github Profile](${c[1]})`, true)
        });
        
        message.channel.send({
            embed: embed
        })
};