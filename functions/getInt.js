const getInt = input => {
    const valid = '0123456789'
    for(let i = 0; i < input.length; i++) {
        if(!valid.includes(input[i])) {
            return -1;
        }
    }
    return parseInt(input);
}

module.exports = getInt;