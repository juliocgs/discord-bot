const reminderService = require('../services/reminder-service');
const scheduleService = require('../services/schedule-service');
const ValidationResult = require('../utils/validation-result');
const Reminder = require('../models/reminder');

/**
 * ReminderFacade Class
*/
class ReminderFacade {
    constructor() {

    }

    createReminder(message, reminder) {
        reminderService.insert(reminder);

        scheduleService.scheduleJob(
            reminder.id
            , reminder.executionDate
            , () => {
                this._setReminder(message, reminder)
            }
        );
    }

    getRemindersByUser(userId) {
        return reminderService.getRemindersByUser(userId);
    }

    deleteReminder(reminderId) {
        const result = new ValidationResult();
        const cancelResult = scheduleService.cancelJob(reminderId);

        if (cancelResult.isValid) {
            reminderService.delete(reminderId);
        }
        else {
            result.addErrors(cancelResult.errors);
        }

        return result;
    }

    _setReminder(message, reminder) {
        const data = ['Hi! You asked me to remind you of: '];
        data.push('```');
        data.push(reminder.message);
        data.push('```');

        reminderService.delete(reminder.id);
        message.author.send(data, { split: true });
    }
}

module.exports = new ReminderFacade();