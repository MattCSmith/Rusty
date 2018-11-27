const Discord = require("discord.js");

// This command deals with the survey app commands

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "samir",
    category: "Miscelaneous",
    description: "Display info about the bot and its contributors",
    usage: "samir"
};

// Array of roles used for the project
const roles = ["Member Of Team Samir", "Front-End", "Back-End", "Design", "Database"]
let guildMember;


exports.run = async (client, message, args, level, user, reaction) => { // eslint-disable-line no-unused-vars
console.log("=========\nARGS\n===========", args, "\n", args, "\n=====================")

    if (!args[0]) menu.embed("surveyApp", message.channel)
    else if (args === "join") {
        // We must check roles of a guild member, so lets get that
        guildMember = message.guild.members.get(user.id)
        joinProject(message);

    }
    else if (args === "leave") leaveProject(message)
    else notifSubscribe(message, args)

    // message.channel.send("This command is temporarily unavailable. Please contact Matt if you require further action to be taken.")
};

joinProject = (message) => {
    if (guildMember.roles.some(r => [roles[0]].includes(r.name))) {
        message.channel.send(":bangbang: " + guildMember + ", You are already signed up for this project!");
    } else {
        // Fetch the role
        const role = message.guild.roles.find("name", roles[0]);

        // Assign the role!
        guildMember.addRole(role).catch(console.error);
    }
}

leaveProject = (message) => {
    roles.forEach(role => {
        if (guildMember.roles.some(r => [role].includes(r.name))) {
            console.log(role + `removed from user`)

            guildMember.removeRole(message.guild.roles.find("name", role)).catch(console.error);
        }
    });

    message.channel.send(`You have left the project`)
}

notifSubscribe = (message) => {
    message.channel.send("Notif")
}