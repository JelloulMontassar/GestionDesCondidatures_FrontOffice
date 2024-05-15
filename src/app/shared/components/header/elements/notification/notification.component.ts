import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { catchError } from 'rxjs';
import { LanguageServiceService } from 'src/app/service/language-service.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  public openNotification: boolean = false;
  tableItem: any;
  total: any = true;

  constructor(private translate: TranslateService, private languageService: LanguageServiceService) {
    this.languageService.language$.subscribe((lang) => { translate.use(lang); }); 
   }

  ngOnInit() {
  }

  toggleNotificationMobile() {
    
    this.openNotification = !this.openNotification;
    this.total = false;
  }

  

}
