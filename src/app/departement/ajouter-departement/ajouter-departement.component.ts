import { Component } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';

import { DepartementService } from 'src/app/service/departement.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';

@Component({
  selector: 'app-ajouter-departement',
  templateUrl: './ajouter-departement.component.html',
  styleUrls: ['./ajouter-departement.component.scss']
})
export class AjouterDepartementComponent {

  DepartementItem: any;

  DepartementForm = this.fb.group(
    {
      libelle: ["", [Validators.required]],
      description: ['---'],
      supression : [0],
      idEntreprise: this.storageService.getUtilisateur().idEntrepriseEnCours,
      libelleEntreprise: this.storageService.getUtilisateur().libelleEntrepriseEnCours

    });

  constructor(private storageService: StorageService,public router: Router, private DepartementService: DepartementService, private fb: FormBuilder ,  private translate: TranslateService ,  private languageService: LanguageServiceService) 
  {  this.languageService.language$.subscribe((lang) => {translate.use(lang);});}
  ngOnInit() { this.loadData(); }

  get libelle() {
    return this.DepartementForm.get("libelle");
  }



  loadData() {
    this.DepartementService.getData().subscribe((data: any[]) => {
      this.DepartementItem = data;
    });

  }


  ajouterDepartement() {

    this.DepartementService.verifierLibelle(this.DepartementForm.value.libelle).subscribe((data: boolean) => {
      if (data == true) {
        this.DepartementForm.controls['libelle'].setErrors({ 'serviceTaken': true });
      } else {
    this.DepartementService.saveDepartement(this.DepartementForm.value).subscribe((data: any[]) => {
      this.router.navigate(["/Departement"]);
    });
      }
    }); 
  }

 

}



