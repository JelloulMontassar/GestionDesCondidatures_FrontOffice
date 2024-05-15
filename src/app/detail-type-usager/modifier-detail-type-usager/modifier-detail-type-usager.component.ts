import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DetailTypeUsagerService } from 'src/app/service/detail-type-usager.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';

@Component({
  selector: 'app-modifier-detail-type-usager',
  templateUrl: './modifier-detail-type-usager.component.html',
  styleUrls: ['./modifier-detail-type-usager.component.scss']
})
export class ModifierDetailTypeUsagerComponent implements OnInit {

  id: number;
  CategorieTypeUsageItem: any;

  CategorieTypeUsageForm = this.fb.group({
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
    private detailTypeUsagerService: DetailTypeUsagerService
  ) {
    this.languageService.language$.subscribe((lang) => { translate.use(lang); });
  }

  get libelle() {
    return this.CategorieTypeUsageForm.get("libelle");
  }

  ngOnInit(): void {
    this.id = +this.routeActivate.snapshot.paramMap.get('id');
    this.onSelect(this.id);
  }

  onSelect(idCategorieTypeUsage: any) {
    this.detailTypeUsagerService.getCategorieTypeUsage(idCategorieTypeUsage).subscribe((data: any[]) => {
      this.CategorieTypeUsageItem = data;

      console.log("Categorie TypeUsage" + JSON.stringify(this.CategorieTypeUsageItem));
      this.CategorieTypeUsageForm.setValue({
        id: this.CategorieTypeUsageItem.id,
        libelle: this.CategorieTypeUsageItem.libelle,
        supression: this.CategorieTypeUsageItem.supression,
        description: this.CategorieTypeUsageItem.description,
        idEntreprise: this.CategorieTypeUsageItem.idEntreprise,
        libelleEntreprise: this.CategorieTypeUsageItem.libelleEntreprise
      });
    });
  }

   
  updateCategorieTypeUsage() {

    this.detailTypeUsagerService.verifierLibelleId(this.CategorieTypeUsageForm.value.libelle,this.CategorieTypeUsageForm.value.id,this.CategorieTypeUsageForm.value.idEntreprise).subscribe((libelleExists: boolean) => {
      if (libelleExists) {
        this.CategorieTypeUsageForm.controls['libelle'].setErrors({ 'categorieTypeUsageTaken': true });
      } else{

     
    
    const updatedCategorieTypeUsage = this.CategorieTypeUsageForm.value;
        this.detailTypeUsagerService.modifierCategorieTypeUsage(updatedCategorieTypeUsage).subscribe(
            (data: any[]) => {
             
                this.router.navigate(['/CategorieUsage']);
              
            }
        );
        
        this.onUpdateCategorieTypeUsagerCycleParam()
      }
    });
}

onUpdateCategorieTypeUsagerCycleParam() {
  const libelleCategorieTypeUsager = this.CategorieTypeUsageForm.value.libelle;
  const oldLibelle = this.CategorieTypeUsageItem?.libelle;

  if (oldLibelle !== libelleCategorieTypeUsager) {
    this.detailTypeUsagerService.modifierCategorieTypeUsagerCycleParam(oldLibelle, libelleCategorieTypeUsager)
      .subscribe((data: any[]) => {
        console.log("CycleParam mis à jour avec succès", data);
      });
    console.log("111111111");
  }
}
}
