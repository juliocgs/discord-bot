const BaseCommand = require('./base-command');

/**
 * Member Online Command Class
 */
class MembersOnlineCommand extends BaseCommand {
    constructor() {
        super(
            'membersonline'
            , 'Tells how many members are online'
            , false
            , ['mo']
        )
    }

    async execute(message) {
        await super.execute(message, args);

        message.guild.members.fetch().then(fm => {
            message.channel.send(`There are ${fm.filter(m => m.presence.status === 'online').size} members online!`);
        });
    }
}

module.exports = MembersOnlineCommand;