import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DepartementService } from 'src/app/service/departement.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';

@Component({
  selector: 'app-modifier-departement',
  templateUrl: './modifier-departement.component.html',
  styleUrls: ['./modifier-departement.component.scss']
})
export class ModifierDepartementComponent {


  id: number;
  DepartementItem: any;

  
  
  DepartementForm = this.fb.group(
    {
      id : [0],
      libelle: ["", [Validators.required]],
      description: [''],
      supression : [0],
      idEntreprise: [0],
      libelleEntreprise: [""],
    });

  

  constructor(public router: Router ,private routeActivate: ActivatedRoute, private DepartementService : DepartementService , private fb: FormBuilder ,  private translate: TranslateService ,  private languageService: LanguageServiceService) 
  {  this.languageService.language$.subscribe((lang) => {translate.use(lang);});}

  ngOnInit() {
    this.id = +this.routeActivate.snapshot.paramMap.get('id');
    this.onSelect(this.id);
   
    
    
    
  }

  get libelle() {
    return this.DepartementForm.get("libelle");
  }
  onSelect(idDepartement: any){
    this.DepartementService.getDepartement(idDepartement).subscribe((data: any[]) => {
      this.DepartementItem = data;
   
      this.DepartementForm.setValue({
        id: this.DepartementItem.id,
        libelle: this.DepartementItem.libelle,
        description: this.DepartementItem.description,
        supression: this.DepartementItem.supression,
        idEntreprise: this.DepartementItem.idEntreprise,
        libelleEntreprise: this.DepartementItem.libelleEntreprise
      })
    });
  }



   modifierDepartement(){
    
    this.DepartementService.verifierLibelleId(this.DepartementForm.value.libelle,this.DepartementForm.value.id,this.DepartementForm.value.idEntreprise).subscribe((data: boolean) => {
      if(data == true ){
        
        this.DepartementForm.controls['libelle'].setErrors({ 'serviceTaken': true });
      }else {

        this.DepartementService.modifierDepartement(this.DepartementForm.value).subscribe((data: any[]) => {
          this.router.navigate(["/admin/Departement"]);
        }); 
      }
    });

   
  } 
}



