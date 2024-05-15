import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, of } from 'rxjs';
import { StorageService } from 'src/app/auth/login/storage.service';
import { DepartementService } from 'src/app/service/departement.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-ajouter-poste',
  templateUrl: './ajouter-poste.component.html',
  styleUrls: ['./ajouter-poste.component.scss']
})
export class AjouterPosteComponent {


  PosteItem: any;
  DepartementItem: any;

  PosteForm = this.fb.group(
    {
      libelle: ['', [Validators.required]],
      description: ['---'],
      departement : [null, [Validators.required]],
      supression : [0],
      idEntreprise: this.storageService.getUtilisateur().idEntrepriseEnCours,
      libelleEntreprise: this.storageService.getUtilisateur().libelleEntrepriseEnCours
    });

  constructor(private storageService: StorageService,public router: Router ,private DepartementService : DepartementService ,private PosteService : PostService  , private fb: FormBuilder  ,  private translate: TranslateService ,  private languageService: LanguageServiceService) 
  {  this.languageService.language$.subscribe((lang) => {translate.use(lang);});}
  ngOnInit() {this.loadData();}

  get libelle() {
    return this.PosteForm.get("libelle");
  }

  get departement() {
    return this.PosteForm.get("departement");
  }

  loadData() {
   this.DepartementService.getData().subscribe((data: any[]) => {
     this.DepartementItem = data;
   });

   this.PosteService.getData().subscribe((data: any[]) => {
    this.PosteItem = data;
  });
 }


 ajouterPoste(){

    let Departement = this.DepartementItem.find( (item) => item.libelle === this.PosteForm.value.departement);
    this.PosteForm.value.departement = Departement;
    this.PosteService.verifierLibelle(this.PosteForm.value.libelle).subscribe((data: boolean) => {
      if (data == true) {
        this.PosteForm.controls['libelle'].setErrors({ 'posteTaken': true });
      } else {
        this.PosteService.savePoste(this.PosteForm.value).subscribe((data: any[]) => {
          this.router.navigate(["/Poste"]);
         }); 
      }
    }); 


    
    
   }

  
}




