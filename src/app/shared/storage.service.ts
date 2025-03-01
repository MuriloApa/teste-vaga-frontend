import { Injectable } from '@angular/core';
import SecureLS from 'secure-ls';
import { JwtToken } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})

export class StorageService {
  private ls: SecureLS = new SecureLS({ encodingType: 'aes' });
  private prefix: string = 'eldorado_';

  clear(): void {
    this.ls.removeAll();
  }

  remove(key: string): void {
    this.ls.remove(this.prefix + key);
  }

  set(key: string, value: JwtToken): void {
    this.ls.set(this.prefix + key, value);
  }

  get(key: string): JwtToken {
    const obj = this.ls.get(this.prefix + key);
    return obj;
  }
}
