import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';
import { ArticleService } from 'src/app/service/article.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss']
})
export class ViewArticleComponent implements OnInit {
 
  id!: number;
  ArticleItem: any;
  privilege: any;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
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

  onSelect(idArticle: any) {
    this.articleService.getArticle(idArticle).subscribe((data: any[]) => {
      this.ArticleItem = data;
      

    });
}

}
