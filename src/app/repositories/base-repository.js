const { Model } = require('objection');

/**
 * Base Repository Class
 */
module.exports = class BaseRepository {
    model;

    constructor(model) {
        if (model === undefined || model === null || !(model.prototype instanceof Model)) {
            throw new TypeError(`Please, provide a valid model in ${this.constructor.name}.`);
        }

        this.model = model;
    }

    /**
     * Gets the query object for this model
     */
    query() {
        return this.model.query();
    }

    /**
     * Gets all entities
     */
    async all() {
        return this.query();
    }

    /**
     * Gets an entity by it's id
     */
    async find(id) {
        return this.query().findById(id);
    }

    /**
     * Inserts a new entity
     */
    async insert(model) {
        return this.query().insert(model);
    }

    /**
     * Updates an existing entity
     */
    async update(id, model) {
        return this.query().patchAndFetchById(id, model);
    }

    /**
     * Delete an entity by it's id
     */
    async delete(id) {
        return this.query().deleteById(id);
    }
}