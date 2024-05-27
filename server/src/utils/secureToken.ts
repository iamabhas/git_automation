const Cryptr = require('cryptr')
import envConfig from "../config";

const {cryptrSecretKey}=envConfig

const cryptr = new Cryptr(cryptrSecretKey, { encoding: 'base64', pbkdf2Iterations: 10000, saltLength: 10 });

export const encryptToken = (token:string)=>{
    const encryptedString = cryptr.encrypt(token);
    return encryptedString
}

export const decryptToken = (token:string)=>{
    const decryptedString = cryptr.decrypt(token);
    return decryptedString
}
