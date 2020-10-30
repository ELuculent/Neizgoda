require('dotenv').config();
const Discord = require('discord.js');
const {promisify} = require('util');
const readdir = promisify(require("fs").readdir);

module.exports = {
    
    async init(config, token=process.env.DISCORD_TOKEN) {
        let eventDir = "./events/";
        let cmdDir = "./commands/";

        let client = new Discord.Client();
        client.commands = new Discord.Collection();
        client.guildSettings = new Discord.Collection();

        try {
            require('./utils/funcs.js')(client);

            let cmdFiles = await readdir(cmdDir);
            let eventFiles = await readdir(eventDir);

            cmdFiles.filter(file => file.endsWith(".js"));
            eventFiles.filter(file => file.endsWith(".js"));
            
            cmdFiles.forEach(file => {
                const command = require(cmdDir+file);
                client.commands.set(command.name, command);
            });

            eventFiles.forEach(file => {
                const event = require(eventDir+file);
                client.on(file.split(".")[0], event.bind(null, client));
            });


        } catch (err) {
            console.log(err);
        }


        client.login(token)
    }
}