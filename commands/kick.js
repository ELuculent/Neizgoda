const { User } = require("discord.js");

module.exports = {
    name: "kick",
    desc: "kicks the specified user",
    usage: "\\kick <user> [reason]",
    args: true,
    guildOnly: true,
    aliases: ['boot'],
    cooldown: 600,
    async execute(msg, args) {
        
        try {
            if(!msg.member.hasPermission("KICK_MEMBERS") || !msg.member.hasPermission("ADMINISTRATOR")) return;

            if (!args.length) return msg.channel.send("You must specify the user to kick");

            let member = await msg.guild.members.fetch(args[0].substring(3, args[0].length-1));
            await member.kick(!args[1] ? "" : args[1]);
            msg.reply("`" + member.user.tag + "` was kicked from the server");

        } catch (err) {
            msg.client.sendToOwner(msg, err);
        }
    }

}