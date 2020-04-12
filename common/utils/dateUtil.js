const getNowTs=function(){
    let nowTs=new Date().getTime()/1000|0;
    return nowTs;
};

module.exports={
    getNowTs
};