const User = require('../models/user.model');

class Service{
    async serviceExists(queryJson){
        return (await User.count(queryJson)) > 0;
    }
    async serviceGetOne(queryJson){
        return User.findOne(queryJson);
    }
    async serviceGetAll(queryCondition){
        return User.findAll(queryCondition);
    }
    async serviceCreateOne(model, t){
        const currentTime = new Date().getTime()/1000|0;
        model['create_ts'] = currentTime;
        model['last_ts'] = currentTime;
        return User.create(model,{transaction: t});
    }
    async serviceDelete(whereJson){
        const exists = await User.count(whereJson);
        if(exists > 0){
            await User.destroy(whereJson);
        }
    }
    async serviceUpdate(model,whereJson){
        model['last_ts'] = new Date().getTime()/1000|0;
        await User.update(model,whereJson);
    }
    
}
module.exports = new Service();
