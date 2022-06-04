module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run({ author, guild, member, content, channel }) {
        const client = this.client;

        if (author.bot || author.webhook) return;

        if (guild && !member) {
            await guild.members.fetch(author.id);
        }

        if (content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
            if (guild) {
                return channel.send(`Hello, my prefix is ${client.prefix}`)
            }
        }

        const args = content.slice(client.prefix.length).trim().split(/ +/g);

        const command = args.shift().toLowerCase();
        const registeredCmd = client.commands.get(command);

        if (!registeredCmd && message.guild) return;

        if (!registeredCmd.con.enabled) return;

        if (registeredCmd.con.guildOnly && !message.guild) {
            return author.send('Run this command inside a guild.').catch(() => { });
        }

        if (registeredCmd.con.ownerOnly && author.id !== client.config.owner.id) {
            return channel.send('Owner only.');
        }

        try {
            registeredCmd.run(message, args);
        } catch (e) {
            client.logger.log(e, 'error')
        }
    }
}