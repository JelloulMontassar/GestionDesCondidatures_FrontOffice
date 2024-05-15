import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private sessionSubject = new BehaviorSubject<any>(null);
  sessionChanges$ = this.sessionSubject.asObservable();

  constructor() {
    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.key === 'utilisateur') {
        const decodedValue = JSON.parse(window.atob(event.newValue));
        this.sessionSubject.next(decodedValue);
      }
    });
  }

  updateSession(newSession: any) {
    const encodedValue = window.btoa(JSON.stringify(newSession));
    sessionStorage.setItem('utilisateur', encodedValue);
    this.sessionSubject.next(newSession);
    
  }

  getSession(): any {
    const user = sessionStorage.getItem('utilisateur');
    if (user) {
      return JSON.parse(window.atob(user));
    }
    return {};
  }
}
