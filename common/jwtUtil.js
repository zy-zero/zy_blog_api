const jwt = require('jsonwebtoken');
const config = require('../config');

const generateJwt = (id, username) => {
    let token = jwt.sign({ id: id, username: username }, config.jwtSecret, { expiresIn: '1d' });
    return token;
};

const verifyJwt = (token) => {
    try {
        let decoded = jwt.verify(token, config.jwtSecret);
        let user_id = decoded.id;
        return user_id;
    } catch (e) {
        return null;
    }
};

module.exports = {
    generateJwt,
    verifyJwt
}