import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { DetailTypeUsagerService } from 'src/app/service/detail-type-usager.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';
import { TypeUsagerService } from 'src/app/service/type-usager.service';

@Component({
  selector: 'app-modifier-type-usager',
  templateUrl: './modifier-type-usager.component.html',
  styleUrls: ['./modifier-type-usager.component.scss']
})
export class ModifierTypeUsagerComponent implements OnInit  {
  id: number;
  TypeUsagerItem: any;
  selectCategorieTypeUsage: any;
  CategorieTypeUsagesItem: any;
  CycleParamItem :any;
  CycleParamItemToSave :any;


  TypeUsagerForm = this.fb.group({
    id: [0],
    // code: ['', Validators.required],
    libelle: ['', Validators.required],
    poidsIdeal: [NaN, [Validators.required, Validators.min(1)]],
    nombreJourCycle: [NaN,[Validators.required, Validators.min(1)]],
    supression: [0],
    categorieTypeUsage: [null, Validators.required],
    description: ['---'],
    idEntreprise: [0],
    libelleEntreprise: [""],

  });

  constructor(
    public router: Router,
    private routeActivate: ActivatedRoute,
    private typeUsagerService: TypeUsagerService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private languageService: LanguageServiceService,
    private location: Location,
    private detailTypeUsageService: DetailTypeUsagerService,
  ) {
    this.languageService.language$.subscribe((lang) => { translate.use(lang); });
  }
  ngOnInit(): void {
    this.id = +this.routeActivate.snapshot.paramMap.get('id');
    this.onSelect(this.id);
    this.loadCategorieTypeUsageData();
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
      //     const numberValue = parseFloat(strValue.replace(/[,\.]/g, ''));
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

  loadCategorieTypeUsageData() {
    this.detailTypeUsageService.getData().subscribe((data: any[]) => {
      this.CategorieTypeUsagesItem = data;
    });
  }

  onSelect(idTypeUsager: any) {
    this.typeUsagerService.getTypeUsager(idTypeUsager).subscribe((data: any[]) => {
      this.TypeUsagerItem = data;
      this.selectCategorieTypeUsage=this.TypeUsagerItem.categorieTypeUsage;

      console.log("TypeUsager" + JSON.stringify(this.TypeUsagerItem));
      console.log("categorie d'TypeUsager"+this.selectCategorieTypeUsage)
      this.TypeUsagerForm.setValue({
        id: this.TypeUsagerItem.id,
        libelle: this.TypeUsagerItem.libelle,
        // code: this.TypeUsagerItem.code,
        poidsIdeal: this.TypeUsagerItem.poidsIdeal,
        nombreJourCycle: this.TypeUsagerItem.nombreJourCycle,
        supression: this.TypeUsagerItem.supression,
        categorieTypeUsage: this.TypeUsagerItem.categorieTypeUsage.libelle, 
        description: this.TypeUsagerItem.description,
        idEntreprise: this.TypeUsagerItem.idEntreprise,
        libelleEntreprise: this.TypeUsagerItem.libelleEntreprise
      });
    });
  }

  onCategorieTypeUsageChange(categorieTypeUsage: any) {

    this.selectCategorieTypeUsage = categorieTypeUsage;
  }

  
  updateTypeUsager() {
    const updatedTypeUsager = this.TypeUsagerForm.value;

    // Set CategorieTypeUsage
    updatedTypeUsager.categorieTypeUsage = this.selectCategorieTypeUsage;

    // const categorieTypeUsageControl = this.TypeUsagerForm.get('categorieTypeUsage');
    // if (categorieTypeUsageControl) {
    //     categorieTypeUsageControl.setValue(this.selectCategorieTypeUsage);
    // } else {
    //     console.error('CategorieTypeUsage control not found.');
    // }
    this.typeUsagerService.verifierLibelleId(this.TypeUsagerForm.value.libelle,this.TypeUsagerForm.value.id,this.TypeUsagerForm.value.idEntreprise).subscribe((libelleExists: boolean) => {
      if (libelleExists) {
        this.TypeUsagerForm.controls['libelle'].setErrors({ 'TypeUsageTaken': true });
      } else{
    this.typeUsagerService.modifierTypeUsager(updatedTypeUsager).subscribe(
        (result) => {
            console.log('TypeUsager mis à jour avec succès', result);
            this.router.navigate(['/TypeUsage']);
        },
        (error) => {
            console.error('Erreur lors de la mise à jour de l\'TypeUsager:', error);
        }
    );

    this.onUpdateTypeUsagerCycleParam()
    }
  });
}
    onUpdateTypeUsagerCycleParam(){
      const idTypeUsager =this.TypeUsagerForm.value.id
      const libelleTypeUsager=this.TypeUsagerForm.value.libelle
      const oldLibelle=this.TypeUsagerItem.libelle
      console.log("aa1"+oldLibelle)
      console.log("bb2"+libelleTypeUsager)
      if (oldLibelle !== libelleTypeUsager) {
        this.typeUsagerService.modifierTypeUsagerCycleParam(oldLibelle, libelleTypeUsager).subscribe((data: any[]) => { });        }
        
    }
}

