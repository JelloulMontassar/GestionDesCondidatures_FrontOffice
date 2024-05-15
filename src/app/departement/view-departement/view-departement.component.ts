import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';
import { DepartementService } from 'src/app/service/departement.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';

@Component({
  selector: 'app-view-departement',
  templateUrl: './view-departement.component.html',
  styleUrls: ['./view-departement.component.scss']
})
export class ViewDepartementComponent {

  
  id!: number;
  DepartementItem: any;
  privilege: any;

  constructor(private route: ActivatedRoute, private departementService: DepartementService ,  private translate: TranslateService ,  private languageService: LanguageServiceService, private storageService: StorageService) 
  {  this.languageService.language$.subscribe((lang) => {translate.use(lang);});
  this.privilege  = this.storageService.getUtilisateur().profile.listPrivileges.find(item => item.libelle === 'Departement');

}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.onSelect(this.id);



  }


  onSelect(idDepartement: any) {
    this.departementService.getDepartement(idDepartement).subscribe((data: any[]) => {
      this.DepartementItem = data;


    });
  }

}
