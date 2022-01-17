const SimpleBoardGame = require('../SimpleBoardGame');
const WinCondition = require('../../classes/WinCondition');

class TicTacToe extends SimpleBoardGame {
    constructor() {
        super(3, 3);
        this.name = 'TicTacToe';
    }

    checkWin() {
        for(const row of this.gamestate) {
            if(row[0] == row[1] && row[1] == row[2] && row[0] != '_') {
                return WinCondition.WIN;
            }
        }
        for(let i = 0; i < 3; i++) {
            if(this.gamestate[0][i] == this.gamestate[1][i] && this.gamestate[1][i] == this.gamestate[2][i] && this.gamestate[0][i] != '_') {
                return WinCondition.WIN;
            }
        }
        if(this.gamestate[0][0] == this.gamestate[1][1] && this.gamestate[1][1] == this.gamestate[2][2] && this.gamestate[0][0] != '_') {
            return WinCondition.WIN;
        }
        if(this.gamestate[0][2] == this.gamestate[1][1] && this.gamestate[1][1] == this.gamestate[2][0] && this.gamestate[0][2] != '_') {
            return WinCondition.WIN;
        }
        if((!this.gamestate[0].includes('_')) && (!this.gamestate[1].includes('_')) && (!this.gamestate[2].includes('_'))) {
            return WinCondition.DRAW;
        }
        return WinCondition.NOWIN;
    }
}

module.exports = TicTacToe;