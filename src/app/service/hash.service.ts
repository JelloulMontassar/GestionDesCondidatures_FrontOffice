import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';


@Injectable({
  providedIn: 'root'
})
export class HashService {
  async hash(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
