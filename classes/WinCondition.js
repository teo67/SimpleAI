class WinCondition {
    constructor() {}
    static WIN = new WinCondition();
    static DRAW = new WinCondition();
    static NOWIN = new WinCondition();
}

module.exports = WinCondition;