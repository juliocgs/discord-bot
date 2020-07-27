/**
 * DmException Class
 * 
 * This exception is thrown when an user try to use a command in DM channel which is not allowed
*/
module.exports = class DmException extends Error {
    constructor(message) {
        super(message);

        this.name = 'DmException';
    }
}