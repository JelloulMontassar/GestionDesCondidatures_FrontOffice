import { Component , OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';
import { CategorieArticleService } from 'src/app/service/categorie-article.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';

@Component({
  selector: 'app-ajouter-categorie-article',
  templateUrl: './ajouter-categorie-article.component.html',
  styleUrls: ['./ajouter-categorie-article.component.scss']
})
export class AjouterCategorieArticleComponent implements OnInit {
  
  CategorieArticleForm = this.fb.group({
    libelle: ['', Validators.required],
    suppression: [0],
    description: ['---'],
    idEntreprise: this.storageService.getUtilisateur().entreprise.id,
    libelleEntreprise: this.storageService.getUtilisateur().entreprise.libelle
  });


  constructor(
    private storageService: StorageService,
    private modalService: NgbModal, 
    public router: Router, 
    private categoriearticleService: CategorieArticleService, 
    private fb: FormBuilder, 
    private translate: TranslateService, 
    private languageService: LanguageServiceService
    ) {
       this.languageService.language$.subscribe((lang) => { translate.use(lang); });
      }
  ngOnInit(): void {
  }

  get libelle() {
    return this.CategorieArticleForm.get("libelle");
  }

  ajouterArticle() {
    this.categoriearticleService.verifierLibelle(this.CategorieArticleForm.value.libelle).subscribe((libelleExists: boolean) => {
      if (libelleExists) {
        this.CategorieArticleForm.controls['libelle'].setErrors({ 'categoriearticleTaken': true });
      } else {
        const categoriearticleData = {
          libelle: this.CategorieArticleForm.value.libelle,
          suppression: this.CategorieArticleForm.value.suppression,
          description: this.CategorieArticleForm.value.description,
          idEntreprise: this.CategorieArticleForm.value.idEntreprise,
          libelleEntreprise: this.CategorieArticleForm.value.libelleEntreprise
        };

        this.categoriearticleService.saveCategorieArticle(categoriearticleData).subscribe(
          (savedCategorieArticle) => {
            this.router.navigate(['/CategorieArticle']);
          
          }
        );
      }
    });
  }

}
