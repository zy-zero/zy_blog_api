const {error} = require('../config/error');

const success = function (res,data) {
    if(data){
        res.json({code:"00",data:data,message:'Success'})
    }else{
        res.json({code:"00",message:'Success'})
    }
};
const fail = function (res,status,message,description) {
    for(let key in error){
        if(error[key][0]===status&&error[key][1]===message && description && description.indexOf && description.indexOf(error[key][2]) > -1){
            res.status(status);
            res.json({code:key,message:message,description});
            return;
        }
    }
    for(let key in error){
        if(error[key][0]===status&&error[key][1]===message){
            res.status(status);
            if(description){
                res.json({code:key,message:message,description});
                return;
            }
            res.json({code:key,message:message});
            return;
        }
    }
    res.status(status);
    res.json({code:"99",message:message});
};
module.exports={
    success,
    fail
};
