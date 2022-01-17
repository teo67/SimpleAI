const getInt = require('../functions/getInt');
const WinCondition = require('../classes/WinCondition');
const { TurnOptionEnum } = require('../classes/TurnOption');
const Stats = require('../classes/Stats');
const prompt = require('prompt-sync')();

const valid = (option, response) => {
    if(option instanceof TurnOptionEnum) {
        if(!option.possibleVals.includes(response)) {
            console.log('Not a valid enum state.');
            return null;
        }
        return response;
    }
    const asInt = getInt(response);
    if(asInt == -1 || asInt < option.min || asInt >= option.max) {
        console.log('Not a valid positive integer.');
        return null;
    } 
    return asInt;
}

module.exports = (MyGame, previousRead) => {
    const newGame = new MyGame();
    if(newGame.numPlayers != 2) {
        console.log('Only two player games are supported for real matches!');
        return;
    }

    console.log('Note: This program has no GUI - it only provides the turns. You\'ll have to use your own board from there.');

    let condition = WinCondition.NOWIN;
    const playerData = [];
    const AIData = [];
    let currentPlayer;
    while(condition === WinCondition.NOWIN) {
        currentPlayer = ['player', playerData];
        let playerTurn;
        do {
            playerTurn = {};
            for(const option of newGame.turnOptions) {
                let response;
                do {
                    response = prompt(`Choose [${option.name}]: `);
                } while(valid(option, response) === null);
                playerTurn[option.name] = valid(option, response);
            }
        } while(!newGame.canTakeTurn(playerTurn, 0));
        newGame.takeTurn(playerTurn, 0);
        playerData.push(newGame.JSONFromGamestate(0));
        condition = newGame.checkWin();
        if(condition !== WinCondition.NOWIN) {
            break;
        }
        currentPlayer = ['AI', AIData];
        const turn = newGame.getTurn(1, previousRead, false);
        newGame.takeTurn(turn, 1);
        AIData.push(newGame.JSONFromGamestate(1));
        condition = newGame.checkWin();

        let returning = 'The AI took the following turn:';
        for(const key of Object.keys(turn)) {
            returning += `\n${key}: ${turn[key]}`;
        }
        console.log(returning);
    }

    console.log(`GAME OVER! ${(condition === WinCondition.DRAW ? 'It\'s a tie!' : `${currentPlayer[0]} wins!`)}`);
    for(const set of [playerData, AIData]) {
        for(const turn of set) {
            if(previousRead[turn] === undefined) {
                previousRead[turn] = new Stats();
            }
            const previousState = previousRead[turn];
            if(condition === WinCondition.WIN) {
                if(set === currentPlayer[1]) {
                    previousState.w++;
                } else {
                    previousState.l++;
                }
            } else {
                previousState.d++;
            }
        }
    }
}