const BaseCrudService = require('./base-crud-service');
const ReminderRepository = require('../repositories/reminder-repository');

/**
 * Reminder Service Class
 */
class ReminderService extends BaseCrudService {
    constructor() {
        super(ReminderRepository);
    }
}

module.exports = new ReminderService();