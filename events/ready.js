module.exports = async (client) => {
    console.log(`Logged in as ${client.user.tag}, ready to serve ${client.users.cache.size} in ${client.guilds.cache.size} servers.`);

    client.user.setActivity(require("../config.json").defaultSettings.prefix + "help", { type: "PLAYING" });
}