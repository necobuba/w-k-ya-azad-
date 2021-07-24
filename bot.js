const Discord = require('discord.js');
const client = new Discord.Client({ disableMentions: 'everyone' });
const ayarêazadî = require('./ayarêazadi.json');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarêazadî.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./azadi/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komîtîkan install.`);
  files.forEach(f => {
    let props = require(`./azadi/${f}`);
    log(`İnstallemîn: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});
client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./azadi/${command}`)];
      let cmd = require(`./azadi/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./azadi/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./azadi/${command}`)];
      let cmd = require(`./azadi/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.on('ready', () => {

  // dîmejtan /////////////////////////////////
  
      var actvs = [
        `biji kurdistan`,
        `azadiya kurdistan`, 
        `êz kûrdîm`
    ];
  
  //////////////////////////////////////////////
    
    client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'LISTENING' });
    setInterval(() => {
        client.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)], { type: 'LISTENING'});
    }, 15000);
    
  
      console.log ('_________________________________________');
      console.log (`Navêmîn                 :                ${client.user.username}`);
      console.log (`Sêrvêre dîmêzenîm       :                ${client.guilds.cache.size}`);
      console.log (`Zîlamno dîmêzênîm       :                ${client.users.cache.size}`);
      console.log (`Prefixamîn              :                ${ayarêazadî.prefix}`);
      console.log (`e mîn                   :                Êz dixatÎgîlim`);
      console.log ('_________________________________________');
    
    });









//client funcs ////////////////////////////////////////////////////
client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarêazadî.bavemin) permlvl = 4;
  return permlvl;
};
//////////////////////////////////////////////////////////////////////













// logina azadi ////////////////////
client.login(ayarêazadî.token);
///////////////////////////////////