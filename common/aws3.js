const { awsConfig } = require('../config');
const AWS = require('aws-sdk');
const s3 = process.env.NODE_ENV !== 'production' ?
    new AWS.S3({
        accessKeyId: awsConfig.accessKeyId,
        secretAccessKey: awsConfig.secretAccessKey,
        region: awsConfig.region
    })
    :
    new AWS.S3({
        region: awsConfig.region
    })
    ;
module.exports = s3;
