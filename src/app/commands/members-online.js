const BaseCommand = require('./base-command');

class MembersOnlineCommand extends BaseCommand {
    constructor() {
        super(
            'membersonline'
            , 'Tells how many members are online.'
            , false
            , ['mo']
        )
    }

    async execute(message) {
        message.guild.members.fetch().then(fm => {
            message.channel.send(`There are ${fm.filter(m => m.presence.status === 'online').size} members online!`);
        });
    }
}

module.exports = MembersOnlineCommand;