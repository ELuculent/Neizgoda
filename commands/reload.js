module.exports = {
    name: 'reload',
    desc: 'Reloads the specified command',
    usage: "\\reload <commandName>",
    args: true,
    execute(msg, args) {

        if (!args.length) 
            return msg.channel.send("You need to pass a command to reload");

        const cmdName = args[0].toLowerCase();
        const cmd = msg.client.commands.get(cmdName) 
                    || msg.client.commands.find(command => command.aliases && command.aliases.includes(command));
        if (!cmd) return msg.channel.send(`That is not a command or alias.`);

        delete require.cache[require.resolve(`./${cmd.name}.js`)];

        try {
            const newCmd = require(`./${cmd.name}.js`);
            msg.client.commands.set(newCmd.name, newCmd);
            msg.channel.send(`The command \`${cmd.name}\` was reloaded`);
        } catch (err) {
            msg.client.sendToOwner(msg, err);
        }
    }
}