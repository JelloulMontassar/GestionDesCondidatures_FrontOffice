import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';


@Component({
  selector: 'app-view-utilisateur',
  templateUrl: './view-utilisateur.component.html',
  styleUrls: ['./view-utilisateur.component.scss']
})
export class ViewUtilisateurComponent {


  
  id!: number;
  UtilisateurItem: any;
  privilege: any;
  SuperAdminPrivilege = false;

  constructor(private route: ActivatedRoute, private utilisateurService: UtilisateurService  ,  private translate: TranslateService ,  private languageService: LanguageServiceService , private storageService: StorageService) 
  {  this.languageService.language$.subscribe((lang) => {translate.use(lang);});

  this.privilege  = this.storageService.getUtilisateur().profile.listPrivileges.find(item => item.libelle === 'Utilisateur');
 
  if (this.storageService.getUtilisateur().profile.id === 1 || this.storageService.getUtilisateur().profile.id === 2091) {
    this.SuperAdminPrivilege = true;
  }

}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.onSelect(this.id);
  }


  onSelect(idUtilisateur: any) {
    this.utilisateurService.getUtilisateur(idUtilisateur).subscribe((data: any[]) => {
      this.UtilisateurItem = data;
    });
  }

}

