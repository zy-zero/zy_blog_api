const crypto = require('crypto');
const cryptoJs = require('crypto-js');
const {silver_api} = require('../config');
const hash_md5_base64 = function(original){
  let hash_md5 = crypto.createHash('md5');
  hash_md5.update(original,"utf8");
  return hash_md5.digest('base64');
};
const hash_md5_hex = function (original) {
  let hash_md5 = crypto.createHash('md5');
  hash_md5.update(original,"utf8");
  return hash_md5.digest('hex');
};
const hmac_sha256_buffer = function(original, secret_key){
  return cryptoJs.HmacSHA256(original,secret_key);
};
const generateSilverHMAC = (parametersJson)=>{
  let hmac = crypto.createHmac('sha1',silver_api.api_key);
  hmac.setEncoding('hex');
  hmac.write(JSON.stringify(parametersJson));
  hmac.end();
  return hmac.read();
};

// // key must be 32
// const aesEncrypt = function(src, key) {
//   let sign = '';
//   const cipher = crypto.createCipheriv('aes-256-ecb', key,null);
//   sign += cipher.update(src, "utf8", 'base64');
//   sign += cipher.final('base64');
//   return sign;
// };
//
// // key must be 32
// const aesDecrypt = function(sign, key) {
//   let src = '';
//   const cipher = crypto.createDecipheriv('aes-256-ecb', key,null);
//   src += cipher.update(sign, 'base64', 'utf8');
//   src += cipher.final('utf8');
//   return src;
// };


module.exports = {
  hash_md5_base64:hash_md5_base64,
  hash_md5_hex:hash_md5_hex,
  hmac_sha256_buffer: hmac_sha256_buffer,
  generateSilverHMAC
  // aesEncrypt:aesEncrypt,
  // aesDecrypt:aesDecrypt
};
