import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CategorieArticleService } from 'src/app/service/categorie-article.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';

@Component({
  selector: 'app-modifier-categorie-article',
  templateUrl: './modifier-categorie-article.component.html',
  styleUrls: ['./modifier-categorie-article.component.scss']
})
export class ModifierCategorieArticleComponent implements OnInit {
  id: number;
  CategorieArticleItem: any;

  CategorieArticleForm = this.fb.group({
    id: [0],
    libelle: ['', Validators.required],
    supression: [0],
    description: ['---'],
    idEntreprise: [0],
    libelleEntreprise: [""],
  });

  constructor(
    public router: Router,
    private routeActivate: ActivatedRoute,
    private fb: FormBuilder,
    private translate: TranslateService,
    private languageService: LanguageServiceService,
    private location: Location,
    private categorieArticleService: CategorieArticleService
  ) {
    this.languageService.language$.subscribe((lang) => { translate.use(lang); });
  }

  get libelle() {
    return this.CategorieArticleForm.get("libelle");
  }
  
  ngOnInit(): void {
    this.id = +this.routeActivate.snapshot.paramMap.get('id');
    this.onSelect(this.id);
  }
  


  onSelect(idCategorieArticle: any) {
    this.categorieArticleService.getCategorieArticle(idCategorieArticle).subscribe((data: any[]) => {
      this.CategorieArticleItem = data;

      
      this.CategorieArticleForm.setValue({
        id: this.CategorieArticleItem.id,
        libelle: this.CategorieArticleItem.libelle,
        supression: this.CategorieArticleItem.supression,
        description: this.CategorieArticleItem.description,
        idEntreprise: this.CategorieArticleItem.idEntreprise,
        libelleEntreprise: this.CategorieArticleItem.libelleEntreprise
      });
    });
  }

  
  updateCategorieArticle() {
    this.categorieArticleService.verifierLibelleId(this.CategorieArticleForm.value.libelle,this.CategorieArticleForm.value.id,this.CategorieArticleForm.value.idEntreprise).subscribe((libelleExists: boolean) => {
      if (libelleExists) {
        this.CategorieArticleForm.controls['libelle'].setErrors({ 'categoriearticleTaken': true });
        
      } else{
        

    const updatedCategorieArticle = this.CategorieArticleForm.value;
    this.categorieArticleService.modifierCategorieArticle(updatedCategorieArticle).subscribe((data: any[]) => {
      

      this.router.navigate(["/CategorieArticle"]);
  }
  );
  

    this.onUpdateCategorieArticleDetailCycleParam()
    }
  });
}

onUpdateCategorieArticleDetailCycleParam() {
  const libelleCategorieTypeUsager = this.CategorieArticleForm.value.libelle;
  const oldLibelle = this.CategorieArticleItem?.libelle;

  if (oldLibelle !== libelleCategorieTypeUsager) {
    this.categorieArticleService.modifierCategorieArticleDetailCycleParam(oldLibelle, libelleCategorieTypeUsager)
      .subscribe((data: any[]) => {
        
      });
    
  }
}

}
