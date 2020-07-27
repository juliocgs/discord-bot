const BaseCommand = require('./base-command');

/**
 * Role Assign Command Class
 */
module.exports = class RoleAssignCommand extends BaseCommand {
    constructor() {
        super(
            'roleassign'
            , 'Assign a role to the user who used this command'
            , true
            , ['ra']
            , '[roleName]'
        )
    }

    async execute(message, args) {
        await super.execute(message, args);

        const roleName = args[0];
        const role = message.guild.roles.cache.find(r => r.name === roleName);

        if (role && message.member.roles.cache.find(r => r.name == roleName)) {
            message.reply('you already have this role.');
        }
        else if (role) {
            message.member.roles.add(role);
            message.reply(`you have been granted with the **${roleName}** role.`);
        }
        else {
            message.reply('this role doesn\'t exist. Please provide an existing role.');
        }
    }
}