module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run() {
        const client = this.client;

        client.logger.log(`${client.user.tag} - online in ${client.guilds.cache.size} servers - looking at ${client.users.cache.size} users.`, 'ready');
    }
}