const config = require('../config');
const awsConfig = config.awsConfig;
const {SUFFIX_CONTENT_TYPE} = require('./constant');

const s3 = require('../common/aws3');
const {RESPONSE_MESSAGE,RESPONSE_DESCRIPTION} = require('../common/constant');
const {BadRequest} = require('../common/errors');

class FileHandler {

    async uploadToS3(fileBuffer,fileSuffix) {
        const uploadParams = {};
        uploadParams.Bucket = awsConfig.bucketName;
        const currentTime = new Date().getTime();
        const fileNameWithTimeStamp = currentTime+fileSuffix;
        uploadParams.Key = fileNameWithTimeStamp;
        uploadParams.ACL = 'public-read';
        uploadParams.Body = fileBuffer;
        const map = SUFFIX_CONTENT_TYPE.MAP;
        for(let key in map){
            if(fileSuffix===key){
                uploadParams.ContentType = map[key];
                break;
            }
        }
        try{
           await s3.putObject(uploadParams).promise();
        }catch (e) {
            console.info(e);
            throw BadRequest(RESPONSE_MESSAGE.BAD_REQUEST,RESPONSE_DESCRIPTION.UPLOAD_FAIL);
        }
        return fileNameWithTimeStamp;
    }
    async deleteSingleFile(file_aws3_key) {
        const deleteParams = {};
        deleteParams.Bucket = awsConfig.bucketName;
        deleteParams.Key = file_aws3_key;
        try{
            await s3.deleteObject(deleteParams).promise();
        }catch (e) {
            console.info(e);
            throw BadRequest(RESPONSE_MESSAGE.BAD_REQUEST,RESPONSE_DESCRIPTION.DELETE_FAIL);
        }
    }

}

module.exports = new FileHandler();
