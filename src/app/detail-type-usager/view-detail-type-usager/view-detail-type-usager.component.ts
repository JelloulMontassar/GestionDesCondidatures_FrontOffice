import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';
import { DetailTypeUsagerService } from 'src/app/service/detail-type-usager.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';

@Component({
  selector: 'app-view-detail-type-usager',
  templateUrl: './view-detail-type-usager.component.html',
  styleUrls: ['./view-detail-type-usager.component.scss']
})
export class ViewDetailTypeUsagerComponent {

  id!: number;
  CategorieTypeUsagerItem: any;
  privilege: any;

  constructor(
    private route: ActivatedRoute,
    private detailtypeUsagerService: DetailTypeUsagerService,
    private translate: TranslateService,
    private languageService: LanguageServiceService,
    private storageService: StorageService
  ) {
    this.languageService.language$.subscribe((lang) => {
      translate.use(lang);
    });
    this.privilege = this.storageService.getUtilisateur().profile.listPrivileges.find(item => item.libelle === 'Centre');

  }

  ngOnInit(): void {
 this.id = +this.route.snapshot.paramMap.get('id');
    this.onSelect(this.id);
  }
  onSelect(idCategorieTypeUsage: any) {
    this.detailtypeUsagerService.getCategorieTypeUsage(idCategorieTypeUsage).subscribe((data: any[]) => {
      this.CategorieTypeUsagerItem = data;


    });
}
}
