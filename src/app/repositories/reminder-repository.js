const BaseRepository = require('./base-repository');
const Reminder = require('../models/reminder');

/**
 * Reminder Repository class
 */
class ReminderRepository extends BaseRepository {
    constructor() {
        super(Reminder);
    }

    getRemindersByUser(userId) {
        return this.query().where('user_id', userId).orderBy('execution_date', 'asc');
    }
}

module.exports = new ReminderRepository();