/**
 * Configuration Service Class
 */
class ConfigService {
    token;
    prefix;
    initChannel;
    authorId;
    defaultRaidTime;
    migrate;

    constructor() {
        const config = require('../../config/config.json')[process.env.NODE_ENV];

        Object.assign(this, config);
    }
}

module.exports = new ConfigService();