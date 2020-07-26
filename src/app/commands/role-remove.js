const BaseCommand = require('./base-command');

module.exports = class RoleDeleteCommand extends BaseCommand {
    constructor() {
        super(
            'roleremove'
            , 'Remove a role to the user who used this command'
            , true
            , ['rr']
            , '[roleName]'
        )
    }

    async execute(message, args) {
        const roleName = args[0];
        const role = message.guild.roles.cache.find(r => r.name === roleName);

        if (role && message.member.roles.cache.find(r => r.name == roleName)) {
            message.member.roles.remove(role);
            message.reply(`the role **${roleName}** has been removed from you.`);
        }
        else if (role && !message.member.roles.cache.find(r => r.name == roleName)) {
            message.reply('you don\'t have this role.');
        }
        else {
            message.reply('this role doesn\'t exist. Please provide an existing role.');
        }
    }
}