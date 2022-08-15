const {SlashCommandBuilder , EmbedBuilder  , Embed} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('replies with avatar of specific user')
    .setDMPermission(false)
    .addUserOption(option => option.setName('user').setDescription('mention user').setRequired(true))

}