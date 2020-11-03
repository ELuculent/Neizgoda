// TODO: make resistant against large servers
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "inrole",
    desc: "Gets all members in a specified role",
    args: true,
    usage: "\\inrole <role>",
    guildOnly: true,
    async execute(msg, args) {
        
        try {
            let role = args[0];
            if (role.startsWith("<@&")) 
                role = msg.guild.roles.resolve(role.substring(3, role.length-1));
            else if (role.startsWith("<@!"))
                msg.channel.send("That is a member, not a role silly");
            else if (parseInt(role) == NaN) 
                role = msg.guild.roles.cache.find("name", role);
            else 
                role = msg.guild.roles.resolve(role);
            
            let role_members = role.members;

            let embed = new MessageEmbed().setColor(0x80f).setTimestamp().setTitle(`${role_members.size} users in role ${role.name}:`);
            
            let str = ""; 
            
            for (const [key, val] of role_members) {
                str += `${val.user.username}#${val.user.discriminator}\n`;
            }
            embed.setDescription(str);

            msg.channel.send(embed);
        } catch (err) {
            msg.client.sendToOwner(msg, err);
        }
    }
}