const addPreZero = (num) => {
    return ('00000000000000000000' + num).slice(-20);
}
module.exports = {
    addPreZero
}