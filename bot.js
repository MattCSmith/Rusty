const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("./config.json");
 
client.on("ready", () => {
  console.log("I am ready!");
});
 
client.on("message", (message) => {
  if (message.content.startsWith("user")) {
    console.log(message.author.username, message.author.discriminator)
    console.log(message.author.avatarURL)
  }
});
 
client.login(config.token);