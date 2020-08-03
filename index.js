//AerBot, an commandbot for discord
//to start the bot type: node . in the TERMINAL
//to stop the bot press ctrl+c while having the TERMINAL selected
//in the following link is further information about the bot aswell as 
//Token generator for when someone discovers the token,
//Bot Permissions, Authorization Flow, Privileged Gateway Intents and General Information
//https://discordapp.com/developers/applications/706531972867948586/information
//Further information about making custom commands for AerBot can be found on the Discord.js site
//https://discord.js.org/#/docs/main/stable/general/welcome

//requires the necessary discord file for the bot
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

const cheerio = require('cheerio');
const request = require('request');

const GoogleImages = require('google-images');
const googleImages = new GoogleImages('002848561436115933327:ghifgblxefw', 'AIzaSyBnzOJFfNkF7HrmpEFXdcJTtaejicd8cBw');

//Prefix symbol for the bot to recognize the commands
const PREFIX = '!';

client.on('message', message=>{

    //here the prefix will be removed from the command and set to as the array value of args
    let args = message.content.substring(PREFIX.length).split(" ");
    let parts = message.content.substring(PREFIX.length).split(" ");

    //switch case where in the commands will be placed
    switch(args[0]){
        case 'Help':
            //fix the embed, to make it look better
            const helpEmbed = new Discord.MessageEmbed()
                                        .setColor(message.member.displayHexColor)
                                        .setTitle('Commandlist')
                                        .addField('Here is the list of commands you asked for!')
                                        .addFields(
                                            {name: '!Help', value: 'Shows list of commands'},
                                            {name: 'Image Commands', value: 'Search options: Tank, Submarine, Jet, Navyship, Arty, Rocket, CastleArt, KnightArt, DMR'},
                                            {name: '!8Ball', value: 'To answer your most important questions'}
                                        ).setTimestamp();

            message.channel.send(helpEmbed);
            break;
        case 'Clear':
            if(!args[1]) return message.reply('Unknown amount, please define the amount of messages you want to delete');
            message.channel.bulkDelete(args[1]);
            break;
        case 'Tank':
            image(message, "Tank");
            break;
        case 'Submarine':
            image(message, "Submarine");
            break;
        case 'Jet':
            image(message, "Jet");
            break;
        case 'Navyship':
            image(message, "Navyship");
            break;
        case 'Arty':
            image(message, "Artillery");
            break;
        case 'Rocket':
            image(message, "Rocket");
            break;
        case 'CastleArt':
            image(message, "Castle Art");
            break;
        case 'KnightArt':
            image(message, "Knight Art");
            break;
        case 'DMR':
            image(message, "designated marksman rifle");
            break;
        case '8Ball':
            message.channel.send('Your answer is: ' + Magic8Ball());
            break;
    }
});

//Searches for a random image
function image(message, parts){

    var search = parts;

    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + search,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };

    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
        $ = cheerio.load(responseBody);
 
        var links = $(".image a.link");
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
       
        console.log(urls);

        if (!urls.length) {
           
            return;
        }
        // Send result
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });
}

function Magic8Ball() {
    var rand = ['Absolutely.', 'Absolutely not.', 'It is true.', 'Impossible.', 'Of course.', 'I do not think so.', 'It is true.', 'It is not true.', 'Sources point to no.', 'Theories prove it.', 'Reply hazy try again', 'Ask again later', 'Better not tell you now', 'Concentrate and ask again'];

    return rand[Math.floor(Math.random()*rand.length)];
}

/*
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
*/

//activation of the bot with the Token
bot.login(process.env.token);

//Tutorial to have your Bot be online
//https://medium.com/davao-js/v2-tutorial-deploy-your-discord-bot-to-heroku-part-2-9a37572d5de4