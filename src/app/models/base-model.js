const { Model, snakeCaseMappers } = require('objection');

/**
 * Base Model Class
 */
module.exports = class BaseModel extends Model {
    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}