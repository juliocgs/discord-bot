const BaseCommand = require('./base-command');
const reminderFacade = require('../facades/reminder-facade');
const moment = require('moment');

/**
 * Reminder Delete Command Class
 */
module.exports = class ReminderDeleteCommand extends BaseCommand {
    constructor() {
        super(
            'reminderdelete'
            , 'Lists all the reminders you have'
            , true
            , ['rmd']
            , '[reminderId]'
            , true
        )
    }

    async execute(message, args) {
        await super.execute(message, args);
        message.delete().catch(console.log);

        const result = await reminderFacade.deleteReminder(args[0]);

        if (result.isValid) {
            message.reply('your reminder has been deleted');
        }
        else {
            message.reply(result.errors.join('\n'));
        }
    }
}