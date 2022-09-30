import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AESEncryptDecryptServiceService {

  constructor() { }
  secretKey = "YourSecretKeyForEncryption&Descryption";
  encrypt(value : string) : string{
    return CryptoJS.AES.encrypt(JSON.stringify({value}), this.secretKey.trim()).toString();
  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
}
