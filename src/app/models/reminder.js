const BaseModel = require('./base-model');
const { Model } = require('objection');

module.exports = class Reminder extends BaseModel {
    static get tableName() {
        return 'reminder';
    }

    static get idColumn() {
        return 'id';
    }
}