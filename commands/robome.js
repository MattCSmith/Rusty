const Discord = require("discord.js");

// This command deals with the survey app commands

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "robome",
    category: "Miscelaneous",
    description: "Display info about the bot and its contributors",
    usage: "test"
};




exports.run = async (client, message, args, level, user, reaction) => { // eslint-disable-line no-unused-vars
    let url1;
    if(!args[0]) url1 = `https://robohash.org/${message.author.tag}`
    if(args[0] == 1) url1 = `https://robohash.org/${message.author.username}1?set=set1`
    if(args[0] == 2) url1 = `https://robohash.org/${message.author.username}1?set=set2`
    if(args[0] == 3) url1 = `https://robohash.org/${message.author.username}1?set=set3`
    if(args[0] == 4) url1 = `https://robohash.org/${message.author.username}1?set=set4`
    console.log(url1, args[0])
    await console.log(url1)
    const embed = await new Discord.RichEmbed()
    .setTitle(message.author.tag)
    .setImage(url1)
    message.channel.send({embed});




}