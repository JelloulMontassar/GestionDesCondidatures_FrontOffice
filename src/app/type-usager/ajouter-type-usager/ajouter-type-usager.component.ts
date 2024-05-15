import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';
import { map } from 'rxjs';
import { TypeUsagerService } from 'src/app/service/type-usager.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';
import { DetailTypeUsagerService } from 'src/app/service/detail-type-usager.service';

@Component({
  selector: 'app-ajouter-type-usager',
  templateUrl: './ajouter-type-usager.component.html',
  styleUrls: ['./ajouter-type-usager.component.scss']
})
export class AjouterTypeUsagerComponent implements OnInit {

  CategorieTypeUsagersItem: any;

  TypeUsagerForm = this.fb.group({
    libelle: ['', Validators.required],
    suppression: [0],
    description: ['---'],
    nombreJourCycle: [NaN, [Validators.required, Validators.min(1)]],
    poidsIdeal: [NaN, [Validators.required, Validators.min(1)]],
    categorieTypeUsage: [null, Validators.required],
    idEntreprise: this.storageService.getUtilisateur().entreprise.id,
    libelleEntreprise: this.storageService.getUtilisateur().entreprise.libelle
  });

  constructor(
    private storageService: StorageService,
    private modalService: NgbModal,
    public router: Router,
    private typeUsagerService: TypeUsagerService,
    private detailTypeUsagerService: DetailTypeUsagerService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private languageService: LanguageServiceService
  ) {
    this.languageService.language$.subscribe((lang) => { translate.use(lang); });
  }


  get libelle() {
    return this.TypeUsagerForm.get("libelle");
  }
  get categorieTypeUsage() {
    return this.TypeUsagerForm.get("categorieTypeUsage");
  }
  get nombreJourCycle() {
    return this.TypeUsagerForm.get("nombreJourCycle");
  }
  get poidsIdeal() {
    return this.TypeUsagerForm.get("poidsIdeal");
  }

  ngOnInit(): void {
    this.loadData();
    this.TypeUsagerForm.get('nombreJourCycle').valueChanges 
      .pipe(
        map((value: any) => {
          const strValue = String(value);
          const numberValue = parseFloat(strValue.replace(/[,\.]/g, ''));
          if (isNaN(numberValue) || numberValue < 0) {
            return null;
          } else {
            return numberValue;
          }
        })
      )
      .subscribe((newValue: number | null) => {
        this.TypeUsagerForm.get('nombreJourCycle').patchValue(newValue, { emitEvent: false });
      });
      // this.TypeUsagerForm.get('poidsIdeal').valueChanges 
      // .pipe(
      //   map((value: any) => {
      //     const strValue = String(value);
      //     const numberValue = parseFloat(strValue.replace(/'e'/g, ''));
      //     if (isNaN(numberValue) || numberValue < 0) {
      //       return null;
      //     } else {
      //       return numberValue;
      //     }
      //   })
      // )
      // .subscribe((newValue: number | null) => {
      //   this.TypeUsagerForm.get('poidsIdeal').patchValue(newValue, { emitEvent: false });
      // });
  }
  loadData() {
    this.detailTypeUsagerService.getData().subscribe((data: any[]) => {
      this.CategorieTypeUsagersItem = data;
    });
  }

  ajouterTypeUsager() {
    let categorieTypeUsage = this.CategorieTypeUsagersItem.find((item) => item.libelle === this.TypeUsagerForm.value.categorieTypeUsage);
    this.TypeUsagerForm.controls['categorieTypeUsage'].setValue(categorieTypeUsage);
    this.typeUsagerService.verifierLibelle(this.TypeUsagerForm.value.libelle).subscribe((libelleExists: boolean) => {
      if (libelleExists) {
        this.TypeUsagerForm.controls['libelle'].setErrors({ 'typeUsagerTaken': true });
      } else {
        const typeusagerData = {
          libelle: this.TypeUsagerForm.value.libelle,
          suppression: this.TypeUsagerForm.value.suppression,
          description: this.TypeUsagerForm.value.description,
          poidsIdeal: this.TypeUsagerForm.value.poidsIdeal,
          nombreJourCycle: this.TypeUsagerForm.value.nombreJourCycle,
          categorieTypeUsage: {
            id: categorieTypeUsage.id,
            libelle: categorieTypeUsage.libelle,
          },
          idEntreprise: this.TypeUsagerForm.value.idEntreprise,
          libelleEntreprise: this.TypeUsagerForm.value.libelleEntreprise
        };

        this.typeUsagerService.saveTypeUsager(typeusagerData).subscribe(
          (savedtypeusager) => {
            this.router.navigate(['/TypeUsage']);
          },
          (error) => {
            console.error('erreur d enregistrement de type usager:', error);
          }
        );
      }
    });
  }

}
