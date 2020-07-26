/**
 * Command Handler Class
*/
module.exports = class CommandHandler {
    commands = {};
    commandFiles;
    bot;
    config;

    constructor(bot) {
        this.bot = bot;
        this.config = require('./services/config-service');
        this.commandFiles = require('fs').readdirSync(`${__dirname}/commands`).filter(file => file.endsWith('.js') && file !== 'base-command.js' && file !== "raid-start.js");

        this.loadCommands();
        this.setupCommandListeners();
    }

    /**
     * This will load all the commands in the commands directory.
     */
    loadCommands() {
        for (const file of this.commandFiles) {
            const Command = require(`${__dirname}/commands/${file}`);
            const command = new Command();
            this.bot.commands.set(command.name, command);
        }
    }

    /**
     * This will setup all the command listeners and register them with the bot.
     */
    setupCommandListeners() {
        this.bot.on('message', async message => {

            if (!message.content.startsWith(this.config.prefix) || message.author.bot)
                return;

            const args = message.content.slice(this.config.prefix.length).split(/ +/);
            const commandName = args.shift().toLowerCase();

            let command = this.bot.commands.get(commandName) || this.bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

            if (!command)
                return message.reply(`I don\'t recognize this command. Try using \`${this.config.prefix}help\` to see all I can do!`);

            if (command.args && !args.length) {
                let reply = `You didn't provide any arguments, ${message.author}!`;

                if (command.usage) {
                    reply += `\nThe proper usage would be: \`${this.config.prefix}${command.name} ${command.usage}\``;
                }

                return message.channel.send(reply);
            }

            try {
                await command.execute(message, args);
            } catch (error) {
                console.error(error);
                message.reply('there was an error trying to execute that command!');
            }
        });
    }
}