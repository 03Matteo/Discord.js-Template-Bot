require('dotenv').config()

const { Client, Collection } = require('discord.js');

const { sep } = require('path');

const { connect } = require('mongoose');

module.exports = class MadBot extends Client {
    constructor() {
        super({
            intents: 32767
        });

        this.TOKEN = process.env.TOKEN;
        this.DB_URL = process.env.DB_URL;
        this.prefix = '!';
        this.commands = new Collection;
        this.configs = require('../../config.json');
        this.logger = require('./Logger');
        this.errors = require('../functions/erorrs');

        if (typeof this.prefix !== 'string') {
            throw new TypeError(`The prefix cannot be '${typeof this.prefix}', provide a string.`);
        }
    }

    loadCommand(cmdPath, cmdName) {
        try {
            const props = new (require(`.${cmdPath}${sep}${cmdName}`))(this);

            this.logger.log(`Loading Command: ${props.name}.`, 'log');

            this.commands.set(props.name, props);
            return false;
        } catch (e) {
            return `Unable to load command ${cmdName}: ${e}`;
        }
    }

    async connectDB() {
        try {
            await connect(this.DB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            })

            this.logger.log('Connected to MongoDB!', 'log')
            return false
        } catch (e) {
            this.logger.log(`DB not connected, something will not work:\n-\n❌ ${e}\n-`, 'error');
        }
    };
}