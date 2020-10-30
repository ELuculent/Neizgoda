let {MessageEmbed} = require('discord.js');

module.exports = {
    name: "help",
    desc: "List my commands",
    aliases: ["commands", "?", "h"],
    usage: "\\help [commandName]",
    args: false,
    execute(msg, args) {
        const data = [];
        const {commands, guildSettings} = msg.client;
        const settings = guildSettings.get('default');

        try {
            if (!args.length) {
                let embed = new MessageEmbed().setTitle("").setTimestamp().setColor(0x80f)
                                              .setAuthor("Here's a list of commands you may use")
                                              .setFooter(`You can send \`${settings.prefix}help [command_name]\` to get information on a specific command!`);
                commands.forEach(cmd => {
                    embed.addField(cmd.name, cmd.desc, false);
                });
                
                if (msg.channel.type == 'dm') return;
    
                return msg.author.send(embed)
                        .then(() => {
                                if (!msg.channel.type == 'dm') msg.reply('I\'ve sent you a DM with all my commands!')
                        })
                        .catch(() => msg.channel.send(embed));
            }
    
            const name = args[0].toLowerCase();
            const cmd = commands.get(name) || commands.find(command => command.aliases && command.aliases.contains(name));
    
            if (!cmd) return msg.reply("that's not a valid command");
    
            let embed = new MessageEmbed().setTimestamp().setColor(0x80f).setAuthor("Neizgoda Help");
    
            embed.addField(cmd.name, cmd.desc, false);
            if (cmd.aliases) embed.addField("Aliases", cmd.aliases.join(", "));
            if (cmd.usage) embed.addField("Usage", "`"+ cmd.usage +"`");
    
            msg.channel.send(embed);
        } catch (err) {
            msg.client.sendToOwner(msg, err);
        }
    }
}