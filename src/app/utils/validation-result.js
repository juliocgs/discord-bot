module.exports = class ValidationResult {
    errors;

    constructor() {
        this.errors = [];
    }

    addError(error) {
        this.errors.push(error);
    }

    addErrors(errors) {
        this.errors = [...this.errors, ...errors];
    }

    get isValid() {
        return this.errors.length === 0;
    }
}