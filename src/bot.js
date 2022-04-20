require('dotenv').config();

const { Client } = require('discord.js');
const client = new Client({
    intents: 32767
});


client.login(process.env.TOKEN);