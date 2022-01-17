To run, use node js ('node .').
You'll be asked to enter the name of the game, and you'll have an option to train the AI against itself or play a real game. 
To make a game, simply create a folder in the 'games' directory with a js file with the same name. 
The js file should export a class that extends some version of the Game class (for example, SimpleBoardGame helps with makes 2d board games).
When training, data will automatically save to a json file in your game folder ('data.json').
The package currently contains:
 - ExampleGame:
   - There are two tiles on the board.
   - Each turn, a player places their piece on one of the empty tiles.
   - First player to put their piece on the right tile wins.
   - Yes, it's incredibly simple. Used as a demo (sample data included).
 - TicTacToe:
   - You know the rules.
   - Data is included for 1,000,000 trainings, but feel free to train it more if necessary.
The algorithm is very simple for now, and so something like chess would take way too much space for a json file. 
I plan on implementing a more complex and efficient algorithm later on in the design.
