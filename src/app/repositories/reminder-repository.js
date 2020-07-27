const BaseRepository = require('./base-repository');
const Reminder = require('../models/reminder');

/**
 * Reminder Repository class
 */
class ReminderRepository extends BaseRepository {
    constructor() {
        super(Reminder);
    }
}

module.exports = new ReminderRepository();