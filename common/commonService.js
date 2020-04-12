const sequelize = require('./db');
class Service{
    async rawQuery(sql,options){
        if(options){
            return await sequelize.query(sql,options);
        }
        return await sequelize.query(sql);
    }
}
module.exports = new Service();

