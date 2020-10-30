const {User} = require("discord.js");

module.exports = client => {
    const config = require('../config.json');

    client.getGuildSettings = (guildID) => {
        if (!client.guildSettings.has("default")) 
            client.guildSettings.set("default", config.defaultSettings);

        if (!guildID) return client.guildSettings.get("default");

        const guildConf = client.guildSettings.get(guildID);
        return {...client.guildSettings.get("default"), ...guildConf};
    }

    client.addToLogs = (guildID, eventData) => {
        return;
    }

    client.sendToOwner = async (msg, error) => {
        let owner = await client.users.cache.get(require("../config.json").owner);
        owner.send(`**Error ${msg.guild.available ? "in " + msg.guild.name + " (" + msg.guild.id + ")" : "during DM with " + msg.author.tag}**\n**Input:**\n\`\`\`\n${msg.content}\n\`\`\`\n**Error:**\n\`\`\`${error}\n\`\`\``);
    }
}


