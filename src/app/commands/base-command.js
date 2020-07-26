/**
 * Base Command Class
 */
class BaseCommand {
    name;
    description;
    args;
    usage;
    aliases = [];
    config;

    constructor(name, description, args = false, aliases = null, usage = null) {
        this.name = name;
        this.description = description;
        this.args = args;
        this.aliases = aliases;
        this.usage = usage;
        this.config = require('../services/config-service');
    }

    async execute(message, args) {
    }
}

module.exports = BaseCommand;