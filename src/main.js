require('dotenv').config()

const MadBot = require('./bases/MadBot');
const client = new MadBot();

const { readdirSync } = require('fs');
const { resolve } = require('path');

const init = async () => {
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

init();