import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavService } from '../../../../services/nav.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';
@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  public language: boolean = false;

  public languages: any[] = [
    {
      language: 'Français',
      code: 'fr',
      type: 'FR',
      icon: 'fr'
    },   
    
    {

    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  },
  
 
 
  {
    language: 'Arabe',
    code: 'ar',
    icon: 'tn'
  }]

  public selectedLanguage: any = {
    language: 'Français',
    code: 'fr',
    type: 'FR',
    icon: 'fr'
  }

  constructor(public navServices: NavService, private translate: TranslateService, private languageService: LanguageServiceService) { }
  // 
  ngOnInit() {
  }

  changeLanguage(lang) {
    this.translate.use(lang.code)
    this.selectedLanguage = lang;
    this.navServices.next = this.selectedLanguage.code;

    this.languageService.setLanguage(lang.code);
  }

}
