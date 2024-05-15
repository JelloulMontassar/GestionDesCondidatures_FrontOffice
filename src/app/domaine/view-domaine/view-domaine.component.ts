import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';
import { DomaineService } from 'src/app/service/domaine.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';

@Component({
  selector: 'app-view-domaine',
  templateUrl: './view-domaine.component.html',
  styleUrls: ['./view-domaine.component.scss']
})
export class ViewDomaineComponent {


  id!: number;
  DomaineItem: any;
  privilege: any;

  constructor(private route: ActivatedRoute, private domaineService: DomaineService ,  private translate: TranslateService ,  private languageService: LanguageServiceService , private storageService: StorageService) 
  {  this.languageService.language$.subscribe((lang) => {translate.use(lang);});

  this.privilege  = this.storageService.getUtilisateur().profile.listPrivileges.find(item => item.libelle === 'Domaine');
}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.onSelect(this.id);



  }


  onSelect(idDomaine: any) {
    this.domaineService.getDomaine(idDomaine).subscribe((data: any[]) => {
      this.DomaineItem = data;


    });
  }

}
