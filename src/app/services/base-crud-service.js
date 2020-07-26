module.exports = class BaseCrudService {
    repository;

    constructor(repository) {
        this.repository = repository;
    }

    async all() {
        return this.repository.all();
    }

    async find(id) {
        return this.repository.find(id);
    }

    async create(model) {
        return this.repository.create(model);
    }

    async update(id, model) {
        return this.repository.update(id, model);
    }

    async delete(id) {
        return this.repository.delete(id);
    }

}