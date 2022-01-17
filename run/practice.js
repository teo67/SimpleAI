const prompt = require('prompt-sync')();
const getInt = require('../functions/getInt');
const WinCondition = require('../classes/WinCondition');
const Stats = require('../classes/Stats');

module.exports = (MyGame, previousRead) => {
    const numTimes = getInt(prompt('How many times? '));
    if(numTimes == -1) {
        console.log('Please supply a positive integer next time.');
        return;
    }
    console.log('Starting Game 1...');
    for(let i = 0; i < numTimes; i++) {
        const newGame = new MyGame();
        let playersData = [];
        for(let j = 0; j < newGame.numPlayers; j++) {
            playersData.push([]); // instantiate array
        }
        let condition = WinCondition.NOWIN;
        let k;
        while(condition === WinCondition.NOWIN) {
            k = -1;
            while(k < newGame.numPlayers - 1 && condition === WinCondition.NOWIN) { // weird for loop to save i outside of scope
                k++;
                const turn = newGame.getTurn(k);
                newGame.takeTurn(turn, k);
                playersData[k].push(newGame.JSONFromGamestate(k));
                condition = newGame.checkWin();
            }   
        }
        for(let j = 0; j < newGame.numPlayers; j++) {
            for(const turn of playersData[j]) {
                if(previousRead[turn] === undefined) {
                    previousRead[turn] = new Stats();
                }
                const previousState = previousRead[turn];
                if(condition === WinCondition.WIN) {
                    if(j == k) {
                        previousState.w++;
                    } else {
                        previousState.l++;
                    }
                } else {
                    previousState.d++;
                }
            }
        }
        if((i + 1) % (Math.round(numTimes / 10)) == 0 || i + 1 == numTimes) {
            console.clear();
            console.log(`Practiced ${i + 1} / ${numTimes}`);
        }
    }
    console.log('Done practicing!');
}