const Discord = require("discord.js");
const client = new Discord.Client();
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
var cron = require('node-cron');
require(`./modules/embeds`)(client)

cron.schedule('* * * * *', () => {
    client.getStats()
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

// Require Congigs, Functions and Modules
client.settings = {} = require("./config.js");
menu = require("./modules/embedMenus")
require("./modules/functions.js")(client);
require("./web/adventConfig")(client);
require("./modules/adventUpdate.js")(client);


menu.init()


const init = async () => {
    // Load Commands
    const cmdFiles = await readdir("./commands/");
    console.log(`Loading a total of ${cmdFiles.length} commands.`);
    cmdFiles.forEach(file => {
        if (!file.endsWith(".js")) return;
        const response = client.loadCommand(file);
        if (response) console.log(response);
    });

    // Then we load events, which will include our message and ready event.
    const evtFiles = await readdir("./events/");
    console.log(`Loading a total of ${evtFiles.length} events.`);
    evtFiles.forEach(file => {
        const eventName = file.split(".")[0];
        console.log(`Loading Event: ${eventName}`);
        const event = require(`./events/${file}`);
        client.on(eventName, event.bind(null, client));
    });

    // Generate a cache of client permissions for pretty perm names in commands.
    client.levelCache = {};
    for (let i = 0; i < client.settings.permLevels.length; i++) {
        const thisLevel = client.settings.permLevels[i];
        client.levelCache[thisLevel.name] = thisLevel.level;
    }

    client.login(client.settings.token);
}

init()
