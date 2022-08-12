const {SlashCommandBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('server commands')
    .setDMPermission(false)
    .addSubcommand(subcommand => 
        subcommand
        .setName('info')
        .setDescription('Server Information'))
    .addSubcommand(subcommand => 
        subcommand 
        .setName('user')
        .setDescription('User Information')
        .addUserOption(option => option.setName('user').setDescription('Discord Mention')))
}