const { Model } = require('objection');
const Discord = require('discord.js');
const Knex = require('knex');
const ScheduleService = require('../app/services/schedule-service');

/**
 * Bot Class
 */
module.exports = class Bot {
    bot;
    configService;
    commandHandler;

    constructor() {
        this.configService = require('../app/services/config-service');
        this.bot = new Discord.Client();

        this.setupDatabase();
        this.setupBot();
        this.setupCommandHandler();
    }

    /**
     * Sets up the database connection and Objection.
     */
    setupDatabase() {
        const knex = Knex(require('../config/database.config.json')[process.env.NODE_ENV]);

        if (this.configService.migrate) {
            knex.migrate.latest();
        }

        Model.knex(knex);
    }

    /**
     * Sets up the bot.
     */
    setupBot() {
        this.bot.on('ready', async () => {
            const initChannel = this.bot.channels.cache.find(c => c.name === this.configService.initChannel);

            if (initChannel) {
                initChannel.send("I'm on!");
            }

            this.bot.user.setActivity('A nice game');
            console.log('Bot on!');
        });
    }

    /**
     * Sets up the command bus.
     */
    setupCommandHandler() {
        const CommandHandler = require('../app/command-handler');
        this.bot.commands = new Discord.Collection();
        this.commandHandler = new CommandHandler(this.bot);
    }

    /**
     * Starts the bot.
     */
    async start() {
        await this.bot.login(this.configService.token);
    }
}