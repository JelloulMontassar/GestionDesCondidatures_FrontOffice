import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';
import { TypeUsagerService } from 'src/app/service/type-usager.service';

@Component({
  selector: 'app-view-type-usager',
  templateUrl: './view-type-usager.component.html',
  styleUrls: ['./view-type-usager.component.scss']
})
export class ViewTypeUsagerComponent implements OnInit {

  id!: number;
  TypeUsagerItem: any;
  privilege: any;

  constructor(
    private route: ActivatedRoute,
    private typeUsagerService: TypeUsagerService,
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
  onSelect(idTypeUsager: any) {
    this.typeUsagerService.getTypeUsager(idTypeUsager).subscribe((data: any[]) => {
      this.TypeUsagerItem = data;
console.log("typeUsager"+JSON.stringify(this.TypeUsagerItem))

    });
}
}
