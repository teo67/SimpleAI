const WinCondition = require('../classes/WinCondition');

class Game {
    constructor() {
        this.name = '';
        this.numPlayers = 2;
        this.gamestate = null; // many games may make their own classes for board
        this.turnOptions = [];
    }

    JSONFromGamestate(playerNum, gamestate = this.gamestate) {
        return '[]';
    }

    oneOption(arr, current, index, playerNum) {
        const copy = Object.assign({}, current);
        for(const possibility of this.turnOptions[index].getAllPossible()) {
            copy[this.turnOptions[index].name] = possibility;
            if(index == this.turnOptions.length - 1) {
                if(this.canTakeTurn(copy, playerNum)) {
                    arr.push(Object.assign({}, copy));
                }
            } else {
                this.oneOption(arr, copy, index + 1, playerNum);
            }
        }
    }

    getTurn(playerNum, data, random = true) { // returns a gamestate that is valid to move to
        const allPossible = [];
        this.oneOption(allPossible, {}, 0, playerNum);
        let highest = null;
        let highestPercent = -1;
        for(const turn of allPossible) {
            const gamestate = this.JSONFromGamestate(playerNum, this.gamestateFromTurn(turn, playerNum));
            if(data[gamestate] !== undefined) {
                const percent = (data[gamestate].w + ((1 / this.numPlayers) * data[gamestate].d)) / (data[gamestate].w + data[gamestate].l + data[gamestate].d); // win-loss-tie percentage (close to w/l)
                if(percent > highestPercent) {
                    highestPercent = percent;
                    highest = turn;
                }
            }
        }
        if(highestPercent == -1 || (random && Math.random() <= 0.2)) {
            return allPossible[Math.floor(Math.random() * allPossible.length)];
        }
        return highest; // turn obj
    }

    canTakeTurn(options, playerNum) {
        return true;
    }

    setGamestate(gamestate, options, playerNum) {
        return;
    }

    gamestateFromTurn(options, playerNum) {
        let target;
        if(this.gamestate instanceof Array) {
            target = JSON.parse(JSON.stringify(this.gamestate));
        } else {
            target = Object.assign({}, this.gamestate);
        }
        this.setGamestate(target, options, playerNum);
        return target;
    }

    takeTurn(options, playerNum) {
        this.setGamestate(this.gamestate, options, playerNum);
    }

    checkWin() { 
        return WinCondition.NOWIN;
    }
}

module.exports = Game;