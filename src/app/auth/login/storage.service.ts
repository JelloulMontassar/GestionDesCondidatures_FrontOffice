import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): boolean {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem('utilisateur');
    const encodedValue = window.btoa(JSON.stringify(user));
    window.sessionStorage.setItem(USER_KEY, encodedValue);
    const encodedValue2 = window.btoa(JSON.stringify(user.utilisateur));
    window.sessionStorage.setItem('utilisateur', encodedValue2);
    return this.isLoggedIn();
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);

    if (user) {
      return JSON.parse(window.atob(user));
    }
    return {};
  }

  public getUtilisateur(): any {
    const user = window.sessionStorage.getItem('utilisateur');
    if (user) {
      return JSON.parse(window.atob(user));
    }
    return {};
  }


  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }
}