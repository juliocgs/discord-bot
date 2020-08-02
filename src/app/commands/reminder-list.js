const BaseCommand = require('./base-command');
const reminderFacade = require('../facades/reminder-facade');
const moment = require('moment');

/**
 * Reminder List Command Class
 */
module.exports = class ReminderListCommand extends BaseCommand {
    constructor() {
        super(
            'reminderlist'
            , 'Lists all the reminders you have'
            , false
            , ['rml']
            , null
            , true
        )
    }

    async execute(message, args) {
        await super.execute(message, args);

        const reminders = await reminderFacade.getRemindersByUser(message.author.id);

        if (reminders.length > 0) {
            const data = ['Hi! Here\'s all yours reminders:'];

            reminders.forEach((r, i) => {
                data.push('```');
                data.push(`Reminder #${i + 1}`);
                data.push(`Id: ${r.id}`);
                data.push(`Message: ${r.message}`);
                data.push(`At: ${moment(r.executionDate).format('YYYY/MM/DD HH:mm')}`);
                data.push('```');
            });

            message.author.send(data, { split: true });
        }
        else {
            message.reply('You don\'t have any reminders!');
        }
    }
}