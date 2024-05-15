import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { ProfileService } from 'src/app/service/profile.service';
import { PrivilegeService } from 'src/app/service/privilege.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceService } from 'src/app/service/language-service.service';

@Component({
  selector: 'app-ajouter-privilege',
  templateUrl: './ajouter-privilege.component.html',
  styleUrls: ['./ajouter-privilege.component.scss']
})
export class AjouterPrivilegeComponent {


  ProfileItem: any;
  ProfileSelect: any;

  PrivilegeForm = this.fb.group(
    {
      libelle: [ "", [Validators.required]],
      module: [ "", [Validators.required]],
      lecture: [false],
      creation: [false],
      modification: [false],
      supression: [false],
      activation: [false],
      reinitialisation: [false],
      synchronisation: [false],
      nbPrivelege: [0],
      order: [0],
      orderModule: [0],
      moduleActiver: [false],
      profile: [null, [Validators.required]]
    });

  get libelle() {
    return this.PrivilegeForm.get("libelle");
  }

  get profile() {
    return this.PrivilegeForm.get("profile");
  }

  get module() {
    return this.PrivilegeForm.get("module");
  }

  constructor(public router: Router, private privilegeService: PrivilegeService, private profileService: ProfileService, private fb: FormBuilder  ,  private translate: TranslateService ,  private languageService: LanguageServiceService) 
  {  this.languageService.language$.subscribe((lang) => {translate.use(lang);});}
  ngOnInit() { this.loadData(); }





  loadData() {
   

    this.profileService.getData().subscribe((data: any[]) => {
      this.ProfileItem = data;
    });

  }


  ajouterPrivilege() {
    let Profile = this.ProfileItem.find((item) => item.libelle === this.PrivilegeForm.value.profile);
    this.PrivilegeForm.value.profile = Profile;


  
     this.privilegeService.verifierLibelle(this.PrivilegeForm.value.libelle).subscribe((data: boolean) => {
      if (data == true) {

        this.PrivilegeForm.controls['libelle'].setErrors({ 'privilegeTaken': true });
      } else {
          
        this.privilegeService.savePrivilege(this.PrivilegeForm.value).subscribe((data: any[]) => {
          this.router.navigate(["/Privilege"]);
        });
      }
    });  


   

  }

  
}





