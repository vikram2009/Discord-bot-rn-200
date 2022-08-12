const {SlashCommandBuilder} = require('discord.js')

module.exports = {

      data : new SlashCommandBuilder()
      .setName('roles')
      .setDescription('ask roles') 
      .setDMPermission(false)

}