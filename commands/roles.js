const {SlashCommandBuilder , PermissionFlagsBits} = require('discord.js')

module.exports = {

      data : new SlashCommandBuilder()
      .setName('roles')
      .setDescription('ask roles') 
      .setDMPermission(false)
      .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers | PermissionFlagsBits.BanMembers)
}