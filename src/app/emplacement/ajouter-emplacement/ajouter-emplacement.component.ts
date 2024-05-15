import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';
import { EmplacementService } from 'src/app/service/emplacement.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';


@Component({
  selector: 'app-ajouter-emplacement',
  templateUrl: './ajouter-emplacement.component.html',
  styleUrls: ['./ajouter-emplacement.component.scss']
})
export class AjouterEmplacementComponent {

  EmplacementItem: any;

  EmplacementForm = this.fb.group(
    {
      libelle: ["", [Validators.required]],
      dateCreation : [new Date().toISOString()],
      description: ['---'],
      supression : [0],
      idEntreprise: this.storageService.getUtilisateur().entreprise.id,
      libelleEntreprise: this.storageService.getUtilisateur().entreprise.libelle

    });

    constructor(private storageService: StorageService,public router: Router, private emplacementService: EmplacementService, private fb: FormBuilder ,  private translate: TranslateService ,  private languageService: LanguageServiceService) 
    {  this.languageService.language$.subscribe((lang) => {translate.use(lang);});}
    ngOnInit() { this.loadData(); }
  
    get libelle() {
      return this.EmplacementForm.get("libelle");
    }

    loadData() {
      this.emplacementService.getData().subscribe((data: any[]) => {
        this.EmplacementItem = data;
      });
  
    }


    ajouterDepartement() {

      this.emplacementService.verifierLibelle(this.EmplacementForm.value.libelle).subscribe((data: boolean) => {
        if (data == true) {
          this.EmplacementForm.controls['libelle'].setErrors({ 'emplacementeTaken': true });
        } else {
      this.emplacementService.saveEmplacement(this.EmplacementForm.value).subscribe((data: any[]) => {
        this.router.navigate(["/Emplacement"]);
      });
        }
      }); 
    }

}
