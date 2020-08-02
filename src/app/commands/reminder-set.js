const BaseCommand = require('./base-command');
const reminderFacade = require('../facades/reminder-facade');
const Reminder = require('../models/reminder');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

/**
 * Reminder Set Command Class
 */
module.exports = class ReminderSetCommand extends BaseCommand {
    constructor() {
        super(
            'reminder'
            , 'Reminds you of something at the specified time'
            , true
            , ['rm']
            , '[time-HH:mm] [date-DD/MM/YYYY] [message]'
            , true
        )
    }

    async execute(message, args) {
        await super.execute(message, args);
        message.delete().catch(console.log);

        if (args.length < 3) {
            message.reply('please, specify time and message');
        }
        else {
            const date = moment(`${args[0]} ${args[1]}`, 'HH:mm YYYY/MM/DD');
            const userMessage = args.slice(2).join(' ');

            if (date.isValid() && date.isAfter(new Date())) {
                reminderFacade.createReminder(message, Reminder.fromJson({
                    id: uuidv4(),
                    userId: message.author.id,
                    message: userMessage,
                    executionDate: date.toDate()
                }));

                message.reply('your reminder is set!');
            }
            else {
                message.reply('please, specify a valid/future date/time');
            }
        }
    }
}