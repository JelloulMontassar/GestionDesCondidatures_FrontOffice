import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';
import { EmplacementService } from 'src/app/service/emplacement.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';

@Component({
  selector: 'app-modifier-emplacement',
  templateUrl: './modifier-emplacement.component.html',
  styleUrls: ['./modifier-emplacement.component.scss']
})
export class ModifierEmplacementComponent {

  id: number;
  EmplacementItem: any;



  EmplacementForm = this.fb.group(
    {
      id: [0],
      libelle: ["", [Validators.required]],
      description: [''],
      dateCreation: [''],
      supression: [0],
      idEntreprise: [0],
      libelleEntreprise: [""]
    });



  constructor(private  storageService : StorageService ,public router: Router, private routeActivate: ActivatedRoute, private emplacementService: EmplacementService, private fb: FormBuilder, private translate: TranslateService, private languageService: LanguageServiceService) { this.languageService.language$.subscribe((lang) => { translate.use(lang); }); }

  ngOnInit() {
    this.id = +this.routeActivate.snapshot.paramMap.get('id');
    this.onSelect(this.id);
  }

  get libelle() {
    return this.EmplacementForm.get("libelle");
  }


  onSelect(idEmplacement: any) {
    this.emplacementService.getEmplacement(idEmplacement).subscribe((data: any[]) => {
      this.EmplacementItem = data;
      this.EmplacementForm.setValue({
        id: this.EmplacementItem.id,
        libelle: this.EmplacementItem.libelle,
        description: this.EmplacementItem.description,
        dateCreation: this.EmplacementItem.dateCreation,
        supression: this.EmplacementItem.supression,
        idEntreprise: this.EmplacementItem.idEntreprise,
        libelleEntreprise: this.EmplacementItem.libelleEntreprise
      })
    });
  }

  modifierEmplacement() {
    this.emplacementService.verifierLibelleId(this.EmplacementForm.value.libelle, this.EmplacementForm.value.id,this.storageService.getUtilisateur().idEntrepriseEnCours).subscribe((data: boolean) => {
      if (data == true) {
        this.EmplacementForm.controls['libelle'].setErrors({ 'emplacementTaken': true });
      } else {

        if (this.EmplacementItem.libelle !== this.EmplacementForm.value.libelle) {
          this.emplacementService.modifierLibelleEmplacement(this.EmplacementItem.libelle, this.EmplacementForm.value.libelle).subscribe((data: any[]) => { });
        }

        this.emplacementService.modifierEmplacement(this.EmplacementForm.value).subscribe((data: any[]) => {
          this.router.navigate(["/Emplacement"]);
        });
      }
    });
  }
}



