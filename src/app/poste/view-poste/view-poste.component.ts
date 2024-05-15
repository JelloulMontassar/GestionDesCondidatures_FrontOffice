import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-view-poste',
  templateUrl: './view-poste.component.html',
  styleUrls: ['./view-poste.component.scss']
})
export class ViewPosteComponent {


  id!: number;
  PosteItem: any;
  privilege: any;

  constructor( private storageService: StorageService ,private route: ActivatedRoute, private posteService: PostService  ,  private translate: TranslateService ,  private languageService: LanguageServiceService) 
  {  this.languageService.language$.subscribe((lang) => {translate.use(lang);});
  this.privilege = this.storageService.getUtilisateur().profile.listPrivileges.find(item => item.libelle === 'Poste');

}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.onSelect(this.id);



  }


  onSelect(idPoste: any) {
    this.posteService.getPoste(idPoste).subscribe((data: any[]) => {
      this.PosteItem = data;


    });
  }

}

