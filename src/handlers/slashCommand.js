module.exports = (client) => {
    const loadSlashCommands = require("../helpers/loadSlashCommands");

    loadSlashCommands(client);

    const emoji = require("../configs/emojis.json");

    client.logSlashCommandError = async function(command, err, interaction, Discord) {
        const nanoID = require("nanoid");
        const channel = client.channels.cache.get("977732207361806336");

        const alphabet = "0123456789";
        const nanoid = nanoID.customAlphabet(alphabet, 16);

        const errorId = nanoid();

        const errorLog = new Discord.MessageEmbed()
            .setColor(client.embeds.errorColor)
            .setTitle("Slash Command Error")
            .addFields (
                { name: "Error", value: `\`\`\`${err}\`\`\`` },
                { name: "ID", value: `${errorId}` },
                { name: "Command", value: `\`${command.name}\`` },
                { name: "User", value: interaction.user.tag },
                { name: "User ID", value: interaction.user.id },
                { name: "Guild", value: interaction.guild.name },
                { name: "Guild ID", value: interaction.guild.id }
            )
            .setTimestamp()

        channel.send({ embeds: [errorLog] });

        const error = new Discord.MessageEmbed()
            .setColor(client.embeds.errorColor)
            .setDescription(`${emoji.error} An error occurred!`)
            .setFooter(`ID: ${errorId}`)

        await interaction.editReply({ embeds: [error] });
    }

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

    client.join = async function(interaction) {
        const data = await joinSchema.findOne({ _id: interaction.guild.id })
            .catch(err => {
                console.error(err);
            })

        if(!data) {
            return `${emoji.error} Disabled`;
        }

        return `${emoji.successful} Enabled`;
    }

    const leaveSchema = require("../models/leaveSchema");

    client.leave = async function(interaction) {
        const data = await leaveSchema.findOne({ _id: interaction.guild.id })
            .catch(err => {
                console.error(err);
            })

        if(!data) {
            return `${emoji.error} Disabled`;
        }

        return `${emoji.successful} Enabled`;
    }

    require("dotenv").config();
}