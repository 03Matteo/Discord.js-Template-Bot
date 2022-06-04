const Commands = require('../../bases/Commands')

module.exports = class Ping extends Commands {
    constructor(client) {
        super(client, {
            name: 'ping',
            enabled: true,
            guildOnly: false,
            ownerOnly: false
        })
    }

    async run({ channel }) {
        channel.send({ content: 'Pong!' })
    }
}