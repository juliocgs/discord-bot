const reminderService = require('../services/reminder-service');
const scheduleService = require('../services/schedule-service');
const Reminder = require('../models/reminder');

/**
 * ReminderFacade Class
*/
class ReminderFacade {
    constructor() {

    }

    setReminder(message, reminder) {
        reminderService.insert(reminder);

        scheduleService.scheduleJob(
            reminder.id
            , reminder.executionDate
            , () => {
                const data = ['Hi! You asked me to remind you of: '];
                data.push('```');
                data.push(reminder.message);
                data.push('```');

                reminderService.delete(reminder.id);
                message.author.send(data, { split: true });
            }
        );
    }
}

module.exports = new ReminderFacade();