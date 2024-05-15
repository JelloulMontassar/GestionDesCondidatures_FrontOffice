import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceService } from 'src/app/service/language-service.service';
import { PrivilegeService } from 'src/app/service/privilege.service';

@Component({
  selector: 'app-view-privilege',
  templateUrl: './view-privilege.component.html',
  styleUrls: ['./view-privilege.component.scss']
})
export class ViewPrivilegeComponent {


  
  id!: number;
  PrivilegeItem: any;


  constructor(private route: ActivatedRoute, private privilegeService: PrivilegeService   ,  private translate: TranslateService ,  private languageService: LanguageServiceService) 
  {  this.languageService.language$.subscribe((lang) => {translate.use(lang);});}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.onSelect(this.id);



  }


  onSelect(idPrivilege: any) {
    this.privilegeService.getPrivilege(idPrivilege).subscribe((data: any[]) => {
      this.PrivilegeItem = data;


    });
  }

}

