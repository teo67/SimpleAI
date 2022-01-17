class TurnOption {
    constructor(_name, _min = 0, _max = 1, _possibleVals = null) { // max is not inclusive, iterates by integers
        this.name = _name;
        if(_possibleVals !== null) {
            this.possibleVals = _possibleVals;
        } else {
            this.min = _min;
            this.max = _max;
        }
    }

    getRandom() {
        if(this.possibleVals !== undefined) {
            return this.possibleVals[Math.floor(Math.random() * this.possibleVals.length)];
        }
        return this.min + Math.floor(Math.random() * (this.max - this.min)); // max is exclusive, min is inclusive
    }

    getAllPossible() {
        if(this.possibleVals !== undefined) {
            return this.possibleVals;
        }
        let returning = [];
        for(let i = this.min; i < this.max; i++) {
            returning.push(i);
        }
        return returning;
    }
}

class TurnOptionEnum extends TurnOption {
    constructor(_name, _possibleVals) {
        super(_name, 0, 1, _possibleVals);
    }
}

module.exports = { TurnOption, TurnOptionEnum };