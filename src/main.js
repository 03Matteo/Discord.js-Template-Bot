require('dotenv').config()

const Testing = require('./bases/Testing');
const client = new Testing()

const { readdirSync } = require('fs');
const { resolve } = require('path');

const main = async () => {
    try {
        const dirs = await readdirSync(resolve(__dirname, './commands'));
        client.logger.log(`Loading ${dirs.length} categories.`, 'log');

        dirs.forEach(async (dir) => {
            await readdirSync(resolve(__dirname, `./commands/${dir}`))
                .filter((cmd) => cmd.split('.').pop() === 'js')
                .forEach((cmd) => {
                    const response = client.loadCommand(`./commands/${dir}`, cmd);

                    if (response) {
                        client.logger.log(response, 'error');
                    }
                });
        });

        const evtFiles = await readdirSync(resolve(__dirname, './events'));
        client.logger.log(`Loading ${evtFiles.length} events.`);

        evtFiles.forEach((file) => {
            const eventName = file.split('.')[0];
            client.logger.log(`Loading Event: ${eventName}`);
            const event = new (require(`./events/${file}`))(client);

            client.on(eventName, (...args) => event.run(...args));
            delete require.cache[require.resolve(`./events/${file}`)];
        });

        client.login(client.TOKEN)

        await client.connectDB();
    } catch (e) {
        client.logger.log(e, 'error')
    }
}

main();

client.on('disconnect', () => client.logger.log('Bot is disconnecting...', 'warn'))
    .on('reconnecting', () => client.logger.log('Bot reconnecting...', 'log'))
    .on('error', (e) => client.logger.log(e, 'error'))
    .on('warn', (m) => client.logger.log(m, 'warn'));

process.on('unhandledRejection', (err) => {
    client.logger.log(err, 'error');
});