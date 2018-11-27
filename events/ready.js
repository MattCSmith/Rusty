module.exports = async client => {
    // Log that the bot is online.
    console.log(`${client.user.tag}, ready to serve ${client.users.size} users in ${client.guilds.size} servers.`);

    // Sets the Bots "PLaying/Watching/Streaming" Status
    client.user.setActivity(`help`, { type: "PLAYING" });
    try {
        let link = await client.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch (e) {
        console.log(e.stack)
    }

};
