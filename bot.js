// Load up the discord.js library
const Discord = require('discord.js');

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const bot = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values.
const config = require('./config.json');
// config.token contains the bot's token
// config.prefix contains the message prefix.

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 * from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
function diceRoll(max, min = 1) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

bot.on('ready', () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  bot.user.setActivity('*hacker voice* im in');

  // // list servers bot is connected to
  // console.log("Servers: ");
  // bot.guilds.forEach((guild) => {
  //    console.log(" - " + guild.name);

  //    guild.channels.forEach((channel) => {
  //        console.log(' ${channel.name} ');
  //    });
  // });
});

bot.on('guildCreate', (guild) => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
});

bot.on('guildDelete', (guild) => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  bot.user.setActivity(`Serving ${bot.guilds.size} servers`);
});

// function sbText(words) {
const sbText = (words) => {
  console.log('CONVERTING TO SPONGEBOB TEXT: ' + words);
  const newwords = new Array(words.length);

  let count = 0;

  for (let j = 0; j < words.length; j++) {
    let newstring = '';
    for (let i = 0; i < words[j].length; i++) {
      if (count % 2 === 0) {
        newstring += words[j][i].toLowerCase();
        count++;
      } else if (count % 2 === 1) {
        newstring += words[j][i].toUpperCase();
        count++;
      }
    }
    newwords[j] = newstring;
  }

  return newwords;
};

bot.on('message', async (message) => {
  // This event will run on every single message received, from any channel or DM.

  // Ignore other bots and self
  if (message.author.bot) return;

  let owomentions = 0;

  // Ignore messages that doesnt start with specific prefix
  // if (message.content.indexOf(config.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  // const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send('Ping?');
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
  }

  if (command === 'say') {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use.
    // To get the "message" itself we join the `args` back into a string with spaces:
    const sayMessage = args.join(' ');
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch((O_o) => { });
    // And we get the bot to say the thing:
    message.channel.send(sayMessage);
  }

  // owo message to respond to empty mention
  if (message.isMentioned(bot.user)) {
    if (message.content.split(' ').length == 1) {
      message.channel.send('(ㅇㅅㅇ )?! he-hewwo?');
    } else {
      let str = ':3?';
      for (i = 0; i < owomentions; i++) {
        str += '?';
      }
      message.channel.send(':3?');
      owomentions++;
    }
  }

  const imRegex = /(i|I)(')?(m|M)\s?/g;
  // dad joke function
  if (imRegex.test(message.content)) {
    // capture whatever is after string and add to dadJoke

    const dadJoke = 'Hi ' + message.content.substr(imRegex.lastIndex) +
      ', I\'m dad!';
    message.channel.send(dadJoke);
  }

  console.log('received message: ' + command + '; ' + args);
  console.log('raw message: <' + message + '>');

  if (command === 'r') {
    const dice = args[0].split("d");
    const num = dice[0];
    const sides = dice[1];

    let results = [];
    let i;
    for (i = 0; i < parseInt(num); i++) {
      results.push(diceRoll(sides))
    }
    const sum = results.reduce((a, b) => a + b, 0);
    let output = results.join(" + ");
    output += " = " + sum;
    message.channel.send(output);
  }
});

bot.login(config.token);
