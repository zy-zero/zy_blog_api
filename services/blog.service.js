const Model = require('../models/blog.model');
class Service{
    async serviceGetOne(queryJson){
        return Model.findOne(queryJson);
    }
    async serviceGetAll(queryCondition){
        return Model.findAll(queryCondition);
    }
    async serviceCreateOne(model, t){
        const currentTime = new Date().getTime()/1000|0;
        model['create_ts'] = currentTime;
        model['last_ts'] = currentTime;
        return Model.create(model,{transaction: t});
    }
    async serviceUpdate(model,whereJson){
        model['last_ts'] = new Date().getTime()/1000|0;
        await Model.update(model,whereJson);
    }


}
module.exports = new Service();
