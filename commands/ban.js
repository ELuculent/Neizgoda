module.exports = {
    name: "ban",
    desc: "bans the specified user",
    usage: "\\ban <user> [days_to_delete] [reason]",
    args: true,
    guildOnly: true,
    cooldown: 600,
    async execute(msg, args) {
        
        try {
            if(!msg.member.hasPermission("BAN_MEMBERS") || !msg.member.hasPermission("ADMINISTRATOR")) return;

            if (!args.length) return msg.channel.send("You must specify the user to ban");

            let member = args[0].substring(3, args[0].length-1)
            let days_to_delete = !args[1] ? 0 : parseInt(args[1]);
            let reason = !args[2] ? "" : args[2];
            
            await msg.guild.members.ban(member, {"days": days_to_delete, "reason": reason});
            msg.reply("`" + member.user.tag + "` was banned from the server");

        } catch (err) {
            msg.client.sendToOwner(msg, err);
        }
    }

}