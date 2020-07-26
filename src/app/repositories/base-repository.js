const { Model } = require('objection');

module.exports = class BaseRepository {
    model;

    constructor(model) {
        if (model === undefined || model === null || !(model.prototype instanceof Model)) {
            throw new TypeError(`Please, provide a valid model in ${this.constructor.name}.`);
        }

        this.model = model;
    }

    query() {
        return this.model.query();
    }

    async all() {
        return this.query();
    }

    async find(id) {
        return this.query().findById(id);
    }

    async create(model) {
        return this.query().insert(model);
    }

    async update(id, model) {
        return this.query().patchAndFetchById(id, model);
    }

    async delete(id) {
        return this.query().deleteById(id);
    }
}