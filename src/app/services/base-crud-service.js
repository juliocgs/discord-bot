/**
 * Base Crud Service Class
 */
module.exports = class BaseCrudService {
    repository;

    constructor(repository) {
        this.repository = repository;
    }

    /**
     * Gets all entities
     */
    async all() {
        return this.repository.all();
    }

    /**
     * Gets an entity by it's id
     */
    async find(id) {
        return this.repository.find(id);
    }

    /**
     * Inserts a new entity
     */
    async insert(model) {
        return this.repository.insert(model);
    }

    /**
     * Updates an existing entity
     */
    async update(id, model) {
        return this.repository.update(id, model);
    }

    /**
     * Delete an entity by it's id
     */
    async delete(id) {
        return this.repository.delete(id);
    }

}