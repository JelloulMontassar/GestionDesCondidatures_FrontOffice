import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';
import { EntrepriseService } from 'src/app/service/entreprise.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';

@Component({
  selector: 'app-view-entreprise',
  templateUrl: './view-entreprise.component.html',
  styleUrls: ['./view-entreprise.component.scss']
})
export class ViewEntrepriseComponent {

  id!: number;
  EntrepriseItem: any;
  privilege: any;
  suivre:any;

  constructor(private route: ActivatedRoute, private EntrepriseService: EntrepriseService ,  private translate: TranslateService ,  private languageService: LanguageServiceService , private storageService: StorageService) 
  {  this.languageService.language$.subscribe((lang) => {translate.use(lang);});
  this.privilege  = this.storageService.getUtilisateur().profile.listPrivileges.find(item => item.libelle === 'Entreprise');
  this.suivre = this.storageService.getUtilisateur().suivre;

}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.onSelect(this.id);



  }


  onSelect(idEntreprise: any) {
    this.EntrepriseService.getEntreprise(idEntreprise).subscribe((data: any[]) => {
      this.EntrepriseItem = data;


    });
  }

}

