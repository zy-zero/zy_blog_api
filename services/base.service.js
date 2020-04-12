const db = require('../common/db');
class Service{
  async query(sql,options){
    return db.query(sql,options);
  }

}
module.exports = new Service();
