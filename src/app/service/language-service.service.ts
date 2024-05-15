import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageServiceService {
  private _language = new BehaviorSubject<string>('fr');

  public get language$() {
    return this._language.asObservable();
  }

  public setLanguage(lang: string) {
    this._language.next(lang);
  }
}
