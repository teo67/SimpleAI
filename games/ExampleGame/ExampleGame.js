// this game is very simple
// each turn, the player chooses to put their piece on the left or right tile
// once a tile has been used, it cannot be used again
// you win when you put your piece on the right tile
// example:
//      Turn 1: Player chooses left tile
//      Turn 2: Other player chooses right tile
//      Player 2 wins!

const Game = require('../Game');
const { TurnOptionEnum } = require('../../classes/TurnOption');
const WinCondition = require('../../classes/WinCondition');

class ExampleGamestate {
    constructor() {
        return {
            left: false, 
            right: false
        };
    }
}

class ExampleGame extends Game {
    constructor() {
        super(); // construct numPlayers
        this.name = 'Example Game';
        this.gamestate = new ExampleGamestate();
        this.turnOptions = [
            new TurnOptionEnum('tile', ['left', 'right'])
        ];
    }

    JSONFromGamestate(playerNum, gamestate = this.gamestate) {
        return (gamestate.left ? 'x' : 'o') + (gamestate.right ? 'x' : 'o'); // example: oo if neither is filled
    }

    gamestateFromJSON(JSON) {
        const returning = new ExampleGamestate();
        if(JSON[0] == 'x') {
            returning.left = true;
        }
        if(JSON[1] == 'x') {
            returning.right = true;
        }
        return returning;
    }
    
    canTakeTurn(options, playerNum) {
        if(this.gamestate[options.tile]) {
            return false;
        }
        return true;
    }

    setGamestate(gamestate, options, playerNum) {
        gamestate[options.tile] = true;
    }

    checkWin() {
        if(this.gamestate.right) {
            return WinCondition.WIN;
        }
        return WinCondition.NOWIN;
    }
}

module.exports = ExampleGame;