var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';


// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

// bot log in
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

function sbText(words) {

    console.log("CONVERTING TO SPONGEBOB TEXT: ");
    var newwords = new Array(words.length);

    var count = 0;

    for (var j = 0; j < words.length; j++) {

        var newstring = "";
        for (var i = 0; i < words[j].length; i++) {
            if (count % 2 === 0) {
                newstring += words[j][i].toLowerCase();
                count++;
            }
            else if (count % 2 === 1) {
                newstring += words[j][i].toUpperCase();
                count++;
            }
        }
        newwords[j] = newstring;
    }

    return newwords
}

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`

    const cursedmichael = 1;//bot.emojis.find(emoji => emoji.name === "cursedmichael");

    if (user == "N30phyte") {
        var args = message.substring(0).split(' ');
        bot.sendMessage({
            to: channelID,
            message: sbText(args).join(" ")
        });
    }

    //console.log(message);
    if (message.substring(0, 1) === '!') {
        // 0 is the first item, 1 is the .... idek
        var args = message.substring(1).split(' ');
        // args is the passed words
        var cmd = args[0];
        var navyseal = "What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little 'clever comment' was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo."
        //console.log(args);

        args = args.splice(1);  // takes the word after cmd
        console.log(args);
        switch (cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;

            case 'fightme':
                bot.sendMessage({
                    to: channelID,
                    message: navyseal

                });
                break;

            case 'ew':
                bot.sendMessage({
                    to: channelID,
                    message: "<:cursedmichael:530467138054389770>"
                    //"<:cursedmichael:530467138054389770>"
                    // find id of emoji in discord type: \:emojiName:
                });
                break;

            case ':3c':
                bot.sendMessage({
                    to: channelID,
                    message: 'uwu'
                });
                break;

            case 'uwu':
                bot.sendMessage({
                    to: channelID,
                    message: "<:uwu:431583673146671104>"
                });
                break;

            case 'gitgud':
                if (args == 'programming') {
                    bot.sendMessage({
                        to: channelID,
                        message: 'i tri :('
                    });
                }
                else {
                    bot.sendMessage({
                        to: channelID,
                        message: 'no u'
                    });
                }
                break;

            case 'sb':
                bot.uploadFile({
                    to: channelID,
                    file: 'sb.jpg',
                    message: sbText(args).join(" ")
                });
                break;
        }
    }
});