module.exports = class Commands {
    constructor(client, {
        name = null,
        enabled = true,
        guildOnly = false,
        ownerOnly = false
        //add any option here
    }) {
        this.client = client;
        this.name = name;
        this.con = { enabled, guildOnly, ownerOnly };
    }
}