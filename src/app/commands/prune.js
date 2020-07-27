const BaseCommand = require('./base-command');

/**
 * Prune Command Class
 */
module.exports = class PruneCommand extends BaseCommand {
    constructor() {
        super(
            'prune'
            , 'Prune channel messages'
            , true
            , ['prn']
            , '[ammount]'
        )
    }

    async execute(message, args) {
        await super.execute(message, args);

        if (message.author.id === this.config.authorId) {
            const amount = parseInt(args[0]);

            if (isNaN(amount)) {
                return message.reply('that doesn\'t seem to be a valid number.');
            } else if (amount < 1 || amount > 100) {
                return message.reply('you need to input a number between 1 and 100.');
            }

            message.delete();

            message.channel.bulkDelete(amount, true)
                .then(() => {
                    message
                        .reply(`deleting ${amount} messages!`)
                        .then(msg => msg.delete({ timeout: 2000 }).catch(console.log));
                })
                .catch(err => {
                    console.error(err);
                    message.channel.send('there was an error trying to prune messages in this channel!');
                });
        }
        else {
            message.reply('you are not allowed to this command.');
        }
    }
}