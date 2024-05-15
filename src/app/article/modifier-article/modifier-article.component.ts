import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ArticleService } from 'src/app/service/article.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CategorieArticleService } from 'src/app/service/categorie-article.service';

@Component({
  selector: 'app-modifier-article',
  templateUrl: './modifier-article.component.html',
  styleUrls: ['./modifier-article.component.scss']
})
export class ModifierArticleComponent implements OnInit {

  id: number;
  ArticleItem: any;
  selectCategorieArticle: any;
  DetailCycleParam :any
  CategorieArticlesItem: any;

  ArticleForm = this.fb.group({
    libelle: ['', Validators.required],
    supression: [0],
    categorieArticle: [null, Validators.required],
    description: ['---'],
    idEntreprise: [0],
    dateCreation: [new Date().toISOString()],
    libelleEntreprise: [""],

  });

  constructor(
    public router: Router,
    private routeActivate: ActivatedRoute,
    private articleService: ArticleService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private languageService: LanguageServiceService,
    private location: Location,
    private categorieArticleService: CategorieArticleService,
  ) {
    this.languageService.language$.subscribe((lang) => { translate.use(lang); });
  }

  ngOnInit() {
    this.id = +this.routeActivate.snapshot.paramMap.get('id');
    this.onSelect(this.id);
    this.loadCategorieArticleData();
  }

  loadCategorieArticleData() {
    this.categorieArticleService.getData().subscribe((data: any[]) => {
      this.CategorieArticlesItem = data;
    });
  }

  onSelect(idArticle: any) {
    this.articleService.getArticle(idArticle).subscribe((data: any[]) => {
      this.ArticleItem = data;
      this.selectCategorieArticle=this.ArticleItem.categorieArticle;

      
      this.ArticleForm.setValue({
        libelle: this.ArticleItem.libelle,
        supression: this.ArticleItem.supression,
        categorieArticle: this.ArticleItem.categorieArticle.libelle, 
        description: this.ArticleItem.description,
        dateCreation: this.ArticleItem.dateCreation,
        idEntreprise: this.ArticleItem.idEntreprise,
        libelleEntreprise: this.ArticleItem.libelleEntreprise
      });
    });
  }
  onCategorieArticleChange(categorieArticle: any) {

   
    this.selectCategorieArticle = categorieArticle;
    
  }

  get libelle() {
    return this.ArticleForm.get("libelle");
  }

  get categorieArticle() {
    return this.ArticleForm.get("categorieArticle");
  }

 /* updateArticle() {
    const updatedArticle = this.ArticleForm.value;

    // Set CategorieArticle
    updatedArticle.categorieArticle = this.selectCategorieArticle;

    const categorieArticleControl = this.ArticleForm.get('categorieArticle');
    if (categorieArticleControl) {
        categorieArticleControl.setValue(this.selectCategorieArticle);
    } else {
        console.error('CategorieArticle control not found.');
    }

    this.articleService.modifierArticle(updatedArticle).subscribe(
        (result) => {
            console.log('Article mis à jour avec succès', result);
            //this.location.back();
        },
        (error) => {
            console.error('Erreur lors de la mise à jour de l\'article:', error);
        }
    );
}*/

updateArticle() {
  const updatedArticle = this.ArticleForm.value;

  updatedArticle.categorieArticle = this.selectCategorieArticle;

  this.articleService.modifierExistingArticle(this.id, updatedArticle).subscribe(
      (result) => {
          
          this.router.navigate(["/Article"]);

      
      }
  );
 
}


// onUpdateTypeUsager(){

//   const idTypeUsager =this.CycleParamForm.value.idTypeUsager
//   const nombreJourCycle=this.CycleParamForm.value.nombreJourCycle
//   console.log("type usager id"+idTypeUsager)
//   console.log("nombre jour cycle"+nombreJourCycle)
//   this.typeUsagerService.getTypeUsager(idTypeUsager).subscribe((data: any) => {
//     const typeUsagerToUpdate = data; 
//     console.log("type usager avant update"+JSON.stringify(typeUsagerToUpdate))
//     typeUsagerToUpdate.nombreJourCycle = nombreJourCycle;

//     this.typeUsagerService.modifierTypeUsager(typeUsagerToUpdate).subscribe(
//       (updatedData: any) => {
//         console.log("TypeUsager updated successfully: " + JSON.stringify(updatedData));
//         this.router.navigate(["/Planification"]);

//       },
//       (error: any) => {
//         console.error("Error updating TypeUsager: " + error);
//       }
//     );
//   });

//   this.modalService.dismissAll();

// }
}
