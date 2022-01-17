const Game = require('./Game');
const { TurnOption } = require('../classes/TurnOption');
const WinCondition = require('../classes/WinCondition');

const boardGamestate = (w, h) => { // get board
    let returning = [];
    for(let i = 0; i < h; i++) {
        returning.push([]);
        for(let j = 0; j < w; j++) {
            returning[returning.length - 1].push('_');
        }
    }
    return returning;
}

class SimpleBoardGame extends Game {
    constructor(_width = 0, _height = 0) {
        super(); // construct numPlayers
        this.name = '';
        this.width = _width;
        this.height = _height;
        this.gamestate = boardGamestate(this.width, this.height);
        this.turnOptions = [
            new TurnOption('row', 0, this.height), 
            new TurnOption('column', 0, this.width)
        ];
    }

    JSONFromGamestate(playerNum, gamestate = this.gamestate) { // json is saved irrelevant to player so data isnt duplicated
        let returning = '';
        for(const row of gamestate) {
            for(const item of row) {
                if(item == playerNum) {
                    returning += 'x';
                } else if(item == '_') {
                    returning += '_';
                } else {
                    returning += 'o';
                }
            }
        }
        return returning;
    }

    canTakeTurn(options, playerNum) {
        if(this.gamestate[options.row][options.column] != '_') {
            return false;
        }
        return true;
    }
    
    setGamestate(gamestate, options, playerNum) {
        gamestate[options.row][options.column] = playerNum; // 0 or 1
    }

    checkWin() {
        return WinCondition.NOWIN;
    }
}

module.exports = SimpleBoardGame;