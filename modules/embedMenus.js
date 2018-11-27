const Discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

let embeds = []
exports.init = async () => {
    const embedFiles = await readdir("./menus/");
    embedFiles.forEach(file => {
        if (!file.endsWith(".json")) return;
        const test = require(`../menus/${file}`);
        embeds.push(test)
    });
}


exports.embed = async (menu, chan) => {
    const data = require(`../menus/${menu}.json`);
    sendEmbed(data, chan)
}

exports.react =(client, reaction, user) => {
    // Resets the reaction, so the user can use it again in the future
    // reaction.remove(user.id)

    // Grabs the embed title so we can check which embed the reaction belongs too
    const which = reaction.message.embeds[0].title
    // Grabs the embed object with the matching title
    const object = embeds.filter(obj => {
        return obj.title === which
    })
    // Finds the emoji index, so we know which option to return
    const emojIndex = object[0].reactions.indexOf(reaction.emoji.name)

    // Determine where to send the response
    let where = (object[0].options[emojIndex][2] === "user" ? {"channel": client.users.get(user.id)} : reaction.message)
    
    // Determines if this should trigger a command
    if(object[0].options[emojIndex][0] === "cmd"){
        const cmdName = object[0].options[emojIndex][1]
        const args = object[0].options[emojIndex][3]
        client.commands.get(cmdName).run(client, where, args, "levelNA", user, reaction)
        console.log("RAN CMD", cmdName)

    }


}

exports.welcome = async (chan) => {
    const welEmbed = require(`../menus/welcome.json`);
    sendEmbed(welEmbed, chan)
}

sendEmbed = async (data, chan) => {
    let embed = new Discord.RichEmbed()
        .setTitle(data.title)
        .setColor(data.color)
        .setThumbnail(data.thumb)
        .setDescription(data.desc)

    data.fields.forEach((f, i) => {
        embed.addField(`${data.reactions[i]} ${f[0]}`, f[1], f[2])
    });

    let msg = await chan.send({
        embed: embed
    });

    // Add reactions to embed
    for (const [i, r] of data.reactions.entries()) {
        await msg.react(r);
    }

}