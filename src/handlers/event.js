module.exports = (client, Discord) => {
    const loadEvents = require("../helpers/loadEvents");

    loadEvents(client, Discord);

    const emoji = require("../configs/emojis.json");

    client.logMessageEventError = async function(event, command, err, message, Discord) {
        const nanoID = require("nanoid");
        const channel = client.channels.cache.get("977732207361806336");

        const alphabet = "0123456789";
        const nanoid = nanoID.customAlphabet(alphabet, 16);

        const errorId = nanoid();

        const errorLog = new Discord.MessageEmbed()
            .setColor(client.embeds.errorColor)
            .setTitle("Event Error")
            .addFields (
                { name: "Error", value: `\`\`\`${err}\`\`\`` },
                { name: "ID", value: `${errorId}` },
                { name: "Event", value: `\`${event.name}\`` },
                { name: "Command", value: `\`${command.name}\`` }
            )
            .setTimestamp()

        channel.send({ embeds: [errorLog] });

        const error = new Discord.MessageEmbed()
            .setColor(client.embeds.errorColor)
            .setDescription(`${emoji.error} There was an error while executing that command!`)
            .setFooter(`ID: ${errorId}`)

        message.reply({ embeds: [error] });
    }

    client.logInteractionEventError = async function(event, command, err, interaction, Discord) {
        const nanoID = require("nanoid");
        const channel = client.channels.cache.get("977732207361806336");

        const alphabet = "0123456789";
        const nanoid = nanoID.customAlphabet(alphabet, 16);

        const errorId = nanoid();

        const errorLog = new Discord.MessageEmbed()
            .setColor(client.embeds.errorColor)
            .setTitle("Event Error")
            .addFields (
                { name: "Error", value: `\`\`\`${err}\`\`\`` },
                { name: "ID", value: `${errorId}` },
                { name: "Event", value: `\`${event.name}\`` },
                { name: "Command", value: `\`${command.name}\`` }
            )
            .setTimestamp()

        channel.send({ embeds: [errorLog] });

        const error = new Discord.MessageEmbed()
            .setColor(client.embeds.errorColor)
            .setDescription(`${emoji.error} There was an error while executing that command!`)
            .setFooter(`ID: ${errorId}`)

        await interaction.editReply({ embeds: [error] });
    }

    const prefixSchema = require("../models/prefixSchema");

    client.prefix = async function(message) {
        let prefix;

        const data = await prefixSchema.findOne({ _id: message.guild.id })
            .catch(err => {
                console.error(err);
            })

        if(data) {
            if(data.prefix) {
                prefix = data.prefix;
            }
        } else {
            prefix = client.config.defaultPrefix;
        }

        return prefix;
    }

    const logsSchema = require("../models/logsSchema");

    client.logs = async function(message) {
        const data = await logsSchema.findOne({ _id: message.guild.id })
            .catch(err => {
                console.error(err);
            })

        if(!data) {
            return `${emoji.error} Disabled`;
        }

        return `<#${data.channel}>`;
    }

    const joinSchema = require("../models/joinSchema");

    client.join = async function(message) {
        const data = await joinSchema.findOne({ _id: message.guild.id })
            .catch(err => {
                console.error(err);
            })

        if(!data) {
            return `${emoji.error} Disabled`;
        }

        return `${emoji.successful} Enabled`;
    }

    const leaveSchema = require("../models/leaveSchema");

    client.leave = async function(message) {
        const data = await leaveSchema.findOne({ _id: message.guild.id })
            .catch(err => {
                console.error(err);
            })

        if(!data) {
            return `${emoji.error} Disabled`;
        }

        return `${emoji.successful} Enabled`;
    }
}