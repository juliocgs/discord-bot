const BaseModel = require('./base-model');

/**
 * Reminder Entity Class
 */
module.exports = class Reminder extends BaseModel {
    static get tableName() {
        return 'reminder';
    }

    static get idColumn() {
        return 'id';
    }
}