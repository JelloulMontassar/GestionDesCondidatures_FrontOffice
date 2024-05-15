import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';
import { DepartementService } from 'src/app/service/departement.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-modifier-poste',
  templateUrl: './modifier-poste.component.html',
  styleUrls: ['./modifier-poste.component.scss']
})
export class ModifierPosteComponent {


   
  id: number;
  DepartementItem: any;
  PosteItem: any;
  DepartementSelect : any;
  
  
  PosteForm = this.fb.group(
    {
      id : [0],
      libelle: ['', [Validators.required]],
      description: ['---'],
      departement : ['', [Validators.required]],
      supression : [0],
      idEntreprise: [0],
      libelleEntreprise: [""],
    });

  

  constructor(private  storageService : StorageService ,public router: Router ,private routeActivate: ActivatedRoute, private departementService : DepartementService , private posteService : PostService, private fb: FormBuilder ,  private translate: TranslateService ,  private languageService: LanguageServiceService) 
  {  this.languageService.language$.subscribe((lang) => {translate.use(lang);});}

  ngOnInit() {
    this.id = +this.routeActivate.snapshot.paramMap.get('id');
    this.onSelect(this.id);
    this.loadData();
    
    
    
  }

  get libelle() {
    return this.PosteForm.get("libelle");
  }

  get departement() {
    return this.PosteForm.get("departement");
  }

  onSelect(idPoste: any){
    this.posteService.getPoste(idPoste).subscribe((data: any[]) => {
      this.PosteItem = data;
      this.DepartementSelect = this.PosteItem.departement
      this.PosteForm.setValue({
        id: this.PosteItem.id,
        libelle: this.PosteItem.libelle,
        departement: this.PosteItem.departement.libelle,
        description: this.PosteItem.description,
        supression: this.PosteItem.supression,
        idEntreprise: this.PosteItem.idEntreprise,
        libelleEntreprise: this.PosteItem.libelleEntreprise
      })
    });
  }

  onDepartementChange(departement: any){
    
      this.DepartementSelect = departement;
   }

   loadData() {
    this.departementService.getData().subscribe((data: any[]) => {
      this.DepartementItem = data;
     
    });
  }


   modifierPoste(){
    this.PosteForm.value.departement = this.DepartementSelect;

    this.posteService.verifierLibelleId(this.PosteForm.value.libelle,this.PosteForm.value.id,this.storageService.getUtilisateur().idEntrepriseEnCours).subscribe((data: boolean) => {
      if(data == true ){
        
        this.PosteForm.controls['libelle'].setErrors({ 'posteTaken': true });
      }else {

        this.posteService.modifierPoste(this.PosteForm.value).subscribe((data: any[]) => {
          this.router.navigate(["/Poste"]);
        }); 
      }
    });


   
  } 
}



