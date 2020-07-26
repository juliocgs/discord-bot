const BaseRepository = require('./base-repository');
const Reminder = require('../models/reminder');

class ReminderRepository extends BaseRepository {
    constructor() {
        super(Reminder);
    }
}

module.exports = new ReminderRepository();