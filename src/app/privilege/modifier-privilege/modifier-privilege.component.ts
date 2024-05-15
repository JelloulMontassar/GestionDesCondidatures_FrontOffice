import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceService } from 'src/app/service/language-service.service';
import { PrivilegeService } from 'src/app/service/privilege.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-modifier-privilege',
  templateUrl: './modifier-privilege.component.html',
  styleUrls: ['./modifier-privilege.component.scss']
})
export class ModifierPrivilegeComponent {


  
  id: number;
  PrivilegeItem: any;
  ProfileItem: any;
  ProfileSelect : any;
 
  PrivilegeForm = this.fb.group(
    {
      id : [0],
      libelle: [ "", [Validators.required]],
      module: [ "", [Validators.required]],
      lecture: ['false'],
      creation: ['false'],
      modification: ['false'],
      supression: ['false'],
      activation: ['false'],
      reinitialisation: ['false'],
      synchronisation: ['false'],
      nbPrivelege: [0],
      order: [0],
      orderModule: [0],
      moduleActiver: ['false'],
      profile: [ "", [Validators.required]]
    });
  

  constructor(public router: Router ,private routeActivate: ActivatedRoute, private ProfileService : ProfileService , private  PrivilegeService : PrivilegeService, private fb: FormBuilder  ,  private translate: TranslateService ,  private languageService: LanguageServiceService) 
  {  this.languageService.language$.subscribe((lang) => {translate.use(lang);});}
  ngOnInit() {
    this.id = +this.routeActivate.snapshot.paramMap.get('id');
    this.onSelect(this.id);
    this.loadData();
    
    
    
  }
  onSelect(idPrivilege: any){
    this.PrivilegeService.getPrivilege(idPrivilege).subscribe((data: any[]) => {
      this.PrivilegeItem = data;
     
      this.PrivilegeForm.setValue({
        id: this.PrivilegeItem.id,
        libelle: this.PrivilegeItem.libelle,
        module: this.PrivilegeItem.module,
        lecture: this.PrivilegeItem.lecture,
        creation: this.PrivilegeItem.creation,
        modification: this.PrivilegeItem.modification,
        supression: this.PrivilegeItem.supression,
        activation: this.PrivilegeItem.activation,
        reinitialisation: this.PrivilegeItem.reinitialisation,
        synchronisation: this.PrivilegeItem.synchronisation,
        nbPrivelege: this.PrivilegeItem.nbPrivelege,
        order: this.PrivilegeItem.order,
        orderModule: this.PrivilegeItem.orderModule,
        moduleActiver: this.PrivilegeItem.moduleActiver,
        profile: this.PrivilegeItem.profile.libelle
       
      });

      this.ProfileSelect = this.PrivilegeItem.profile

    });


   
  }

  onProfileChange(Profile: any){
    
      this.ProfileSelect = Profile;
   }

   loadData() {
    this.ProfileService.getData().subscribe((data: any[]) => {
      this.ProfileItem = data;
     
    });
  }

  get libelle() {
    return this.PrivilegeForm.get("libelle");
  }

  get profile() {
    return this.PrivilegeForm.get("profile");
  }

  get module() {
    return this.PrivilegeForm.get("module");
  }

   modifierPrivilege(){
     this.PrivilegeForm.value.profile = this.ProfileSelect;

  this.PrivilegeService.verifierLibelleId(this.PrivilegeForm.value.libelle,this.PrivilegeForm.value.id).subscribe((data: boolean) => {
      if(data == true ){
        
        this.PrivilegeForm.controls['libelle'].setErrors({ 'privilegeTaken': true });
      }else {

        this.PrivilegeService.modifierPrivilege(this.PrivilegeForm.value).subscribe((data: any[]) => {
          this.router.navigate(["/Privilege"]);
        });  
      }
    });
 
   
  } 
}



