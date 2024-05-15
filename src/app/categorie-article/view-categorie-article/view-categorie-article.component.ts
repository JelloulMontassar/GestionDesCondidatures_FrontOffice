import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';
import { CategorieArticleService } from 'src/app/service/categorie-article.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';

@Component({
  selector: 'app-view-categorie-article',
  templateUrl: './view-categorie-article.component.html',
  styleUrls: ['./view-categorie-article.component.scss']
})
export class ViewCategorieArticleComponent implements OnInit {

  id!: number;
  CategorieArticleItem: any;
  privilege: any;
  
  constructor(
    private route: ActivatedRoute,
    private categoriearticleService: CategorieArticleService,
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
 
  onSelect(idCategorieArticle: any) {
      this.categoriearticleService.getCategorieArticle(idCategorieArticle).subscribe((data: any[]) => {
        this.CategorieArticleItem = data;
  
  
      });
  }

}
