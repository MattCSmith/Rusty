const Discord = require("discord.js");

// This event executes when a reaction is added to a message
// We will use this to collect Reaction Stats
// We will also use this for the welcome interface

module.exports = async (client, reaction, user) => {
    // Ignore Bot Reactions
    if(user.bot) return

    // Stats
    // To be implemented
    // ....
    
    
      
    // Menu Reactions
    if(reaction.message.embeds[0]){
        menu.react(client, reaction, user)
    }
};