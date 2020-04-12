const redisConfig = require('../config').redis;
const bluebird = require('bluebird');
const redis = require("redis");
// change redis api to promise function
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const clientOptions = {};
if(redisConfig.password!=null){
    clientOptions.password = redisConfig.password;
}
clientOptions.host = redisConfig.host;
clientOptions.port = redisConfig.port;
const client = redis.createClient(clientOptions);
//pool
const genericPool = require('generic-pool');
const factory = {
    create: function() {
        return redis.createClient(clientOptions);
    },
    destroy: function(client) {
        client.quit();
    }
};
const opts = {
    max: 10, // maximum size of the pool
    min: 2 // minimum size of the pool
};

const redisPool = genericPool.createPool(factory, opts);

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err);
});
const getNewInstance = function(){
    return redis.createClient(clientOptions);
};

module.exports={
    redis:redis,
    redisClient:client,
    getNewInstance,
    redisPool
};
