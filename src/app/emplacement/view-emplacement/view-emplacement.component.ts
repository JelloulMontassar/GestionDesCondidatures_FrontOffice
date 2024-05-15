import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';
import { EmplacementService } from 'src/app/service/emplacement.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';

@Component({
  selector: 'app-view-emplacement',
  templateUrl: './view-emplacement.component.html',
  styleUrls: ['./view-emplacement.component.scss']
})
export class ViewEmplacementComponent {


  id!: number;
  EmplacementItem: any;
  privilege: any;

  constructor(private route: ActivatedRoute, private emplacementService: EmplacementService ,  private translate: TranslateService ,  private languageService: LanguageServiceService , private storageService: StorageService) 
  {  this.languageService.language$.subscribe((lang) => {translate.use(lang);});
  this.privilege  = this.storageService.getUtilisateur().profile.listPrivileges.find(item => item.libelle === 'Emplacement');

}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.onSelect(this.id);

  }


  onSelect(idEmplacement: any) {
    this.emplacementService.getEmplacement(idEmplacement).subscribe((data: any[]) => {
      this.EmplacementItem = data;
  

    });
  }

}
