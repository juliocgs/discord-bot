const DmException = require('../exceptions/dm-exception');

/**
 * Base Command Class
 */
class BaseCommand {
    name;
    description;
    args;
    usage;
    aliases = [];
    allowDM;
    config;

    constructor(name, description, args = false, aliases = null, usage = null, allowDM = null) {
        this.name = name;
        this.description = description;
        this.args = args;
        this.aliases = aliases;
        this.usage = usage;
        this.allowDM = allowDM || false;
        this.config = require('../services/config-service');
    }

    /**
     * Executes the command action
     */
    async execute(message, args) {
        if (!this.allowDM && message.channel.type === 'dm') {
            throw new DmException(`Sorry, I can only use the \`${this.name}\` command in a server!`);
        }
    }
}

module.exports = BaseCommand;