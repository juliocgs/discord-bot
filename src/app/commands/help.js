const BaseCommand = require('./base-command');

/**
 * Help Command Class
 */
class HelpCommand extends BaseCommand {
    constructor() {
        super(
            'help'
            , 'List all bot commands'
            , false
            , ['commands']
            , '[command name]'
            , true
        )
    }

    async execute(message, args) {
        await super.execute(message, args);

        const data = [];
        let { commands } = message.client;

        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => `\`${this.config.prefix}${command.name}\``).join(', '));
            data.push(`\nYou can send \`${this.config.prefix}help [command name]\` to get info on a specific command!`);

            return message.reply(data, { split: true });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }

        data.push('```');
        data.push(`Name: ${command.name}`);

        if (command.aliases)
            data.push(`Aliases: ${command.aliases.join(', ')}`);

        if (command.description)
            data.push(`Description: ${command.description}`);

        if (command.usage)
            data.push(`Usage: ${this.config.prefix}${command.name} ${command.usage}`);

        data.push('```');
        message.channel.send(data, { split: true });
    }
}

module.exports = HelpCommand;