module.exports = {
  httpPort: process.env.httpPort || '8000',
  httpsPort: process.env.httpsPort || '443',
  socketPort:process.env.socketPort|| '8002',
  mysql: {
    database: process.env.mysql_database || 'test1',
    username: process.env.mysql_username || 'root',
    password: process.env.mysql_password || 'zhangyu',
    // password: process.env.mysql_password || '123456',
    options: {
      //host: process.env.mysql_options_host || '10.10.120.99',
       'host': process.env.mysql_options_host || '127.0.0.1',
      dialect: process.env.mysql_options_dialect || 'mysql',
      define: {
        charset: 'utf8mb4',
        dialectOptions: {
          collate: 'utf8mb4_unicode_ci'
        }
      },
      // logging: false,
    }
  },
  jwtSecret: process.env.jwt_secret || "8658e8dd-c6c0-43d1-8732-47adf146485d",
  redis:{
    //host: process.env.redis_host || "10.10.120.99",
    host: process.env.redis_host || "127.0.0.1",
    port: process.env.redis_port || 6379,
    //password:'Redis199,',
  },
  awsConfig: {
    accessKeyId: process.env.accessKeyId || "AKIA6LHNDDQHKCFZDSXL",
    secretAccessKey: process.env.secretAccessKey || "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",
    bucketName: process.env.bucketName || "blog-test",
    region:process.env.region || "us-east-1"
  },
};
