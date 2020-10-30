module.exports = async (client, msg) => {
    
    if (msg.author.bot) return;
    
    const settings = msg.guildSettings = client.getGuildSettings(msg.guild);

    const prefixMsg = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (msg.content.match(prefixMsg)) {
        return msg.channel.send(`My prefix for this guild is ${settings.prefix}`);
    }
    
    if (msg.content.indexOf(settings.prefix) !== 0) return;

    const args = msg.content.slice(settings.prefix.length).trim().split(" ");
    const commandName = args.shift().toLowerCase();

    if (msg.guild && !msg.member) await msg.guild.members.fetch(msg.author);

    const cmd = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!cmd) return;

    if (cmd.args && !args.length) 
        return msg.reply("You need to send the required arguments!\nUsage: `" + cmd.usage + "`.");

    if (cmd.guildOnly && msg.channel.type === 'dm')
        return msg.channel.send("That command can only be used in servers");

    try {
        cmd.execute(msg, args);
    } catch (err) {
        console.error(err);
        msg.channel.send(`ERROR:\n\`\`\`\n${err}\n\`\`\``);
    }
}