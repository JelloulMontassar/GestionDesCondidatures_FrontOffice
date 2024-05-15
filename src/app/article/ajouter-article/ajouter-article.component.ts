import { Component , OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';
import { ArticleService } from 'src/app/service/article.service';
import { CategorieArticleService } from 'src/app/service/categorie-article.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';

@Component({
  selector: 'app-ajouter-article',
  templateUrl: './ajouter-article.component.html',
  styleUrls: ['./ajouter-article.component.scss']
})
export class AjouterArticleComponent implements OnInit {
  CategorieArticlesItem: any;

  ArticleForm = this.fb.group({
    libelle: ['', Validators.required],
    suppression: [0],
    description: ['---'],
    dateCreation: [new Date().toISOString()],
    categorieArticle: [null, Validators.required],
    idEntreprise: this.storageService.getUtilisateur().entreprise.id,
    libelleEntreprise: this.storageService.getUtilisateur().entreprise.libelle
  });

  constructor(
    private storageService: StorageService,
    private modalService: NgbModal, 
    public router: Router, 
    private articleService: ArticleService, 
    private categorieArticleService: CategorieArticleService, 
    private fb: FormBuilder, 
    private translate: TranslateService, 
    private languageService: LanguageServiceService
    ) {
       this.languageService.language$.subscribe((lang) => { translate.use(lang); });
      }

      get libelle() {
        return this.ArticleForm.get("libelle");
      }
      get categorieArticle() {
        return this.ArticleForm.get("categorieArticle");
      }

      

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.categorieArticleService.getData().subscribe((data: any[]) => {
      this.CategorieArticlesItem = data;
    });
  }

  ajouterArticle() {
    let categorieArticle = this.CategorieArticlesItem.find((item) => item.libelle === this.ArticleForm.value.categorieArticle);
    this.ArticleForm.controls['categorieArticle'].setValue(categorieArticle);
    this.articleService.verifierLibelle(this.ArticleForm.value.libelle).subscribe((libelleExists: boolean) => {
      if (libelleExists) {
        this.ArticleForm.controls['libelle'].setErrors({ 'articleTaken': true });
      } else {
        const articleData = {
          libelle: this.ArticleForm.value.libelle,
          suppression: this.ArticleForm.value.suppression,
          description: this.ArticleForm.value.description,
          dateCreation: this.ArticleForm.value.dateCreation,
          categorieArticle: {
            id: categorieArticle.id,
            libelle: categorieArticle.libelle,
          },
          idEntreprise: this.ArticleForm.value.idEntreprise,
          libelleEntreprise: this.ArticleForm.value.libelleEntreprise
        };

        this.articleService.saveArticle(articleData).subscribe(
          (savedArticle) => {
            this.router.navigate(['/Article']);
          
          }
        );
      }
    });
  }

}
