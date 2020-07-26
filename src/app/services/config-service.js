const ValidationResult = require('../utils/validation-result');

class ConfigService {
    token;
    prefix;
    initChannel;
    authorId;
    defaultRaidTime;

    constructor() {
        const config = require('../../config/config.json')[process.env.NODE_ENV];

        this.token = config.token;
        this.prefix = config.prefix;
        this.initChannel = config.initChannel;
        this.authorId = config.authorId;
    }
}

module.exports = new ConfigService();