const { Model, snakeCaseMappers } = require('objection');

module.exports = class BaseModel extends Model {
    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}