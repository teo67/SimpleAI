const prompt = require('prompt-sync')();
const fs = require('fs');
const practice = require('./run/practice');
const match = require('./run/match');

const gameName = prompt('Choose your game: ');

if((!fs.existsSync(`./games/${gameName}`)) || (!fs.existsSync(`./games/${gameName}/${gameName}.js`))) {
    console.log(`${gameName} was not found.`);
    return;
}

const MyGame = require(`./games/${gameName}/${gameName}`);

const previousRead = fs.existsSync(`./games/${gameName}/data.json`) ? JSON.parse(fs.readFileSync(`./games/${gameName}/data.json`)) : {};

(prompt('Practice? ') == 'y' ? practice : match)(MyGame, previousRead);

fs.writeFileSync(`./games/${gameName}/data.json`, JSON.stringify(previousRead, null, 2));