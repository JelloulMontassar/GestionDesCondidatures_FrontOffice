import { Component , OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';
import { DetailTypeUsagerService } from 'src/app/service/detail-type-usager.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';

@Component({
  selector: 'app-ajouter-detail-type-usager',
  templateUrl: './ajouter-detail-type-usager.component.html',
  styleUrls: ['./ajouter-detail-type-usager.component.scss']
})
export class AjouterDetailTypeUsagerComponent implements OnInit {
  
  CategorieTypeUsagerForm = this.fb.group({
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
    private detailTypeUsagerService: DetailTypeUsagerService, 
    private fb: FormBuilder, 
    private translate: TranslateService, 
    private languageService: LanguageServiceService
    ) {
       this.languageService.language$.subscribe((lang) => { translate.use(lang); });
      }
  
  ngOnInit(): void {

  }

  get libelle() {
    return this.CategorieTypeUsagerForm.get("libelle");
  }

  ajouterCategorieUsage() {
    this.detailTypeUsagerService.verifierLibelle(this.CategorieTypeUsagerForm.value.libelle).subscribe((libelleExists: boolean) => {
      if (libelleExists) {
        this.CategorieTypeUsagerForm.controls['libelle'].setErrors({ 'categoriearticleTaken': true });
      } else {
        const categorietypeusagerData = {
          libelle: this.CategorieTypeUsagerForm.value.libelle,
          suppression: this.CategorieTypeUsagerForm.value.suppression,
          description: this.CategorieTypeUsagerForm.value.description,
          idEntreprise: this.CategorieTypeUsagerForm.value.idEntreprise,
          libelleEntreprise: this.CategorieTypeUsagerForm.value.libelleEntreprise
        };

        this.detailTypeUsagerService.saveCategorieTypeUsage(categorietypeusagerData).subscribe(
          (savedCategorieArticle) => {
            this.router.navigate(['/CategorieUsage']);
          },
          (error) => {
            console.error('erreur d enregistrement de categorie Usage:', error);
          }
        );
      }
    });
  }

}
