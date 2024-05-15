import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, of } from 'rxjs';
import { LanguageServiceService } from 'src/app/service/language-service.service';
import { ProfileService } from 'src/app/service/profile.service';
import { PrivilegeService } from 'src/app/service/privilege.service';
import { StorageService } from 'src/app/auth/login/storage.service';
import { EntrepriseService } from 'src/app/service/entreprise.service';




@Component({
  selector: 'app-ajouter-profile',
  templateUrl: './ajouter-profile.component.html',
  styleUrls: ['./ajouter-profile.component.scss']
})
export class AjouterProfileComponent {

  PrivilegeItem = [];
  profileSuperAdmin : any;

  ProfileForm = this.fb.group(
    {
      libelle: ["", [Validators.required]],
      description: [''],
      supression: [0],
      idEntreprise: this.storageService.getUtilisateur().idEntrepriseEnCours,
      libelleEntreprise: this.storageService.getUtilisateur().libelleEntrepriseEnCours
    });

  constructor(private  entrepriseService : EntrepriseService,private storageService: StorageService, public router: Router, private profileService: ProfileService, private fb: FormBuilder, private translate: TranslateService, private languageService: LanguageServiceService, private privilegeService: PrivilegeService) { this.languageService.language$.subscribe((lang) => { translate.use(lang); });}
  ngOnInit() { this.loadData(); }

  get libelle() {
    return this.ProfileForm.get("libelle");
  }



  loadData() {
    this.profileService.getSuperProfile(this.storageService.getUtilisateur().idEntrepriseEnCours).subscribe((data: any[]) => {
     this.profileSuperAdmin = data;


     if (this.storageService.getUtilisateur().idEntrepriseEnCours != this.storageService.getUtilisateur().entreprise.id) {
      this.entrepriseService.getEntreprise(this.storageService.getUtilisateur().idEntrepriseEnCours).subscribe((dataEntreprises: any) => {
        dataEntreprises.listModuleInstalleParEntreprise.forEach((outerItem) => {
          outerItem.listDetailModuleInstalleParEntreprise.forEach((innerItem) => {
            const privilege = this.profileSuperAdmin.listPrivileges.find((item) => item.libelle === innerItem.libelle);
            if (outerItem.active && innerItem.active  ) {
              if (privilege) {
                if (privilege.lecture) {

                  if (privilege.libelle === 'Entreprise') {
                    this.PrivilegeItem.push({ module: outerItem.libelle, libelle: innerItem.libelle, lecture: false, creation: false, modification: false, supression: false, order: innerItem.code, active : innerItem.active, visibleLecture: innerItem.lecture, visibleCreation: innerItem.creation, visibleModification: innerItem.modification, visibleSuppresion: innerItem.supression , idEntreprise : innerItem.idEntreprise, visibleLectureSuperAdmin: privilege.lecture ,visibleCreationSuperAdmin: false, visibleModificationSuperAdmin: false, visibleSuppresionSuperAdmin: false});

                  }else {
                    this.PrivilegeItem.push({ module: outerItem.libelle, libelle: innerItem.libelle, lecture: false, creation: false, modification: false, supression: false, order: innerItem.code, active : innerItem.active, visibleLecture: innerItem.lecture, visibleCreation: innerItem.creation, visibleModification: innerItem.modification, visibleSuppresion: innerItem.supression , idEntreprise : innerItem.idEntreprise, visibleLectureSuperAdmin: privilege.lecture ,visibleCreationSuperAdmin: privilege.creation, visibleModificationSuperAdmin: privilege.modification, visibleSuppresionSuperAdmin: privilege.supression});

                  }

                }
              }
            }
          });
        });
      })
      }else {
        this.storageService.getUtilisateur().entreprise.listModuleInstalleParEntreprise.forEach((outerItem) => {
          outerItem.listDetailModuleInstalleParEntreprise.forEach((innerItem) => {
            const privilege = this.profileSuperAdmin.listPrivileges.find((item) => item.libelle === innerItem.libelle);
            if (outerItem.active && innerItem.active  ) {
              if (privilege) {
                if (privilege.lecture) {

                  if (privilege.libelle === 'Entreprise') {
                    this.PrivilegeItem.push({ module: outerItem.libelle, libelle: innerItem.libelle, lecture: false, creation: false, modification: false, supression: false, order: innerItem.code, active : innerItem.active, visibleLecture: innerItem.lecture, visibleCreation: innerItem.creation, visibleModification: innerItem.modification, visibleSuppresion: innerItem.supression , idEntreprise : innerItem.idEntreprise, visibleLectureSuperAdmin: privilege.lecture ,visibleCreationSuperAdmin: false, visibleModificationSuperAdmin: false, visibleSuppresionSuperAdmin: false});

                  }else {
                    this.PrivilegeItem.push({ module: outerItem.libelle, libelle: innerItem.libelle, lecture: false, creation: false, modification: false, supression: false, order: innerItem.code, active : innerItem.active, visibleLecture: innerItem.lecture, visibleCreation: innerItem.creation, visibleModification: innerItem.modification, visibleSuppresion: innerItem.supression , idEntreprise : innerItem.idEntreprise, visibleLectureSuperAdmin: privilege.lecture ,visibleCreationSuperAdmin: privilege.creation, visibleModificationSuperAdmin: privilege.modification, visibleSuppresionSuperAdmin: privilege.supression});

                  }

                 
                }
              }
            }
          });
        });
        
      }







      });
  }


  onChangeLecture(index: number) {
    if(this.PrivilegeItem[index].lecture){
      this.PrivilegeItem[index].creation = false;
      this.PrivilegeItem[index].modification = false;
      this.PrivilegeItem[index].supression = false;
    }
    this.PrivilegeItem[index].lecture = !this.PrivilegeItem[index].lecture
  }

  onChangeCreation(index: number) {
    this.PrivilegeItem[index].creation = !this.PrivilegeItem[index].creation
    if (!this.PrivilegeItem[index].lecture) {
      this.PrivilegeItem[index].lecture = !this.PrivilegeItem[index].lecture
    }
  }

  onChangeModification(index: number) {
    this.PrivilegeItem[index].modification = !this.PrivilegeItem[index].modification
    if (!this.PrivilegeItem[index].lecture) {
      this.PrivilegeItem[index].lecture = !this.PrivilegeItem[index].lecture
    }
  }

  onChangeSupression(index: number) {
    this.PrivilegeItem[index].supression = !this.PrivilegeItem[index].supression
    if (!this.PrivilegeItem[index].lecture) {
      this.PrivilegeItem[index].lecture = !this.PrivilegeItem[index].lecture
    }
  }


  getRowspan(module: string): number {
    return this.PrivilegeItem.filter(item => item.module === module).length;
  }

  ajouterProfile() {
    this.profileService.verifierLibelle(this.ProfileForm.value.libelle).subscribe((data: boolean) => {
      if (data == true) {
        this.ProfileForm.controls['libelle'].setErrors({ 'profileTaken': true });
      } else {
        this.profileService.saveProfile(this.ProfileForm.value).subscribe((data: any[]) => {
          const listePrivilegeReduit: Partial<any>[] = this.PrivilegeItem.map(({ creation, lecture, libelle, modification, module, order, supression,active , idEntreprise }) => ({
            creation,
            lecture,
            libelle,
            modification,
            module,
            order,
            supression,
            active,
            idEntreprise
          }));
          const listePrivileges: any[] = listePrivilegeReduit.map((objet) => ({
            ...objet,
            profile: data,
          }));

         
          this.privilegeService.saveAllPrivilege(listePrivileges).subscribe((data: any[]) => { 
            this.router.navigate(["/Profile"]);
          });
        });
      }
    });
  }
}



