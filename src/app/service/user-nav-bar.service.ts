import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../auth/login/storage.service';
import { UtilisateurService } from './utilisateur.service';

@Injectable({
  providedIn: 'root'
})
export class UserNavBarService {

  private _user: any;
  private _userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {

  }

  get user() {
    return this._user;
  }

  set user(value: any) {
    this._user = value;
    this._userSubject.next(value);
  }

  get userObservable() {
    return this._userSubject.asObservable();
  }
}