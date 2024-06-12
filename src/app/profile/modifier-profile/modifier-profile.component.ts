import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';
import { EntrepriseService } from 'src/app/service/entreprise.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';
import { ModuleInstalleParEntrepriseService } from 'src/app/service/module-installe-par-entreprise.service';
import { PrivilegeService } from 'src/app/service/privilege.service';
import { ProfileService } from 'src/app/service/profile.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { SessionService } from 'src/app/shared/services/session.service';


@Component({
  selector: 'app-modifier-profile',
  templateUrl: './modifier-profile.component.html',
  styleUrls: ['./modifier-profile.component.scss']
})
export class ModifierProfileComponent {


  id: number;
  ProfileItem!: any;
  ModulesItem!: any;
  PrivilegeItem = [];

  profileSuperAdmin: any;
  PrivilegeItemTemp = [];
  Privileges = [];

  ProfileForm = this.fb.group(
    {
      id: [0],
      libelle: ["", [Validators.required]],
      description: [''],
      supression: [0],
      idEntreprise: [0],
      libelleEntreprise: [""]
    });

  constructor(private entrepriseService: EntrepriseService, private utilisateurService: UtilisateurService, private storageService: StorageService, public router: Router, private routeActivate: ActivatedRoute, private profileService: ProfileService, private fb: FormBuilder, private translate: TranslateService, private languageService: LanguageServiceService, private moduleInstalleParEntrepriseService: ModuleInstalleParEntrepriseService, private privilegeService: PrivilegeService, private sessionService: SessionService) 
  {
     this.languageService.language$.subscribe((lang) => { translate.use(lang); }); 
    
    }

  ngOnInit() {
    this.id = +this.routeActivate.snapshot.paramMap.get('id');
      this.onSelect(this.id);

  }

  get libelle() {
    return this.ProfileForm.get("libelle");
  }

   onSelect(idProfile: any) {
    this.profileService.getSuperProfile(this.storageService.getUtilisateur().idEntrepriseEnCours).subscribe((data: any[]) => {
      this.Privileges.splice(0);
      this.profileSuperAdmin = data;


      this.profileService.getProfile(idProfile).subscribe((dataProfile: any[]) => {

        this.ProfileItem = dataProfile;

        this.PrivilegeItem.splice(0);
        const filteredPrivileges = this.ProfileItem.listPrivileges.filter(pri => pri.active === true);

        this.PrivilegeItem.push(...filteredPrivileges);

        this.ProfileForm.setValue({
          id: this.ProfileItem.id,
          libelle: this.ProfileItem.libelle,
          description: this.ProfileItem.description,
          supression: this.ProfileItem.supression,
          idEntreprise: this.ProfileItem.idEntreprise,
          libelleEntreprise: this.ProfileItem.libelleEntreprise
        });


        if (this.storageService.getUtilisateur().idEntrepriseEnCours != this.storageService.getUtilisateur().entreprise.id) {



      

        
          this.entrepriseService.getEntreprise(this.storageService.getUtilisateur().idEntrepriseEnCours).subscribe((dataEntreprises: any) => {
            this.ModulesItem = dataEntreprises.listModuleInstalleParEntreprise.filter(module => module.active === true);
            const missingPrivilegesds = this.ModulesItem.reduce((acc, element) => {
              const missingDetails = element.listDetailModuleInstalleParEntreprise.filter(detail =>
                detail.active && !this.ProfileItem.listPrivileges.some(pri => pri.libelle === detail.libelle)
              );
              if (missingDetails.length > 0) {
                const missingElement = { ...element };
                missingElement.listDetailModuleInstalleParEntreprise = missingDetails;
                acc.push(missingElement);
              }
              return acc;
            }, []);
            missingPrivilegesds.forEach(element => {
              element.listDetailModuleInstalleParEntreprise.forEach(detail => {
                const privilege = this.profileSuperAdmin.listPrivileges.find((item) => item.libelle === detail.libelle);
                if (detail.active) {
                  if (this.ProfileItem.libelle === 'Super Admin') {
                    this.PrivilegeItem.push({
                      module: element.libelle,
                      libelle: detail.libelle,
                      lecture: false,
                      creation: false,
                      modification: false,
                      supression: false,
                      order: detail.code,
                      visibleLecture: detail.lecture,
                      visibleCreation: detail.creation,
                      visibleModification: detail.modification,
                      visibleSuppresion: detail.supression,
                      active: detail.active,
                      idEntreprise: detail.idEntreprise,
                      visibleLectureSuperAdmin: true,
                      visibleCreationSuperAdmin: true,
                      visibleModificationSuperAdmin: true,
                      visibleSuppresionSuperAdmin: true
                    });
                  } else {
                    if (privilege) {
                      if (privilege.lecture) {
                        this.PrivilegeItem.push({
                          module: element.libelle,
                          libelle: detail.libelle,
                          lecture: false,
                          creation: false,
                          modification: false,
                          supression: false,
                          order: detail.code,
                          visibleLecture: detail.lecture,
                          visibleCreation: detail.creation,
                          visibleModification: detail.modification,
                          visibleSuppresion: detail.supression,
                          active: detail.active,
                          idEntreprise: detail.idEntreprise,
                          visibleLectureSuperAdmin: privilege.lecture,
                          visibleCreationSuperAdmin: privilege.creation,
                          visibleModificationSuperAdmin: privilege.modification,
                          visibleSuppresionSuperAdmin: privilege.supression
                        });
                      }
                    }
                  }
                }
              });
            });

            this.ModulesItem.forEach(outerItem => {
              outerItem.listDetailModuleInstalleParEntreprise.forEach(innerItem => {

                const existingPrivilegeIndex = this.PrivilegeItem.findIndex(privilege => privilege.libelle === innerItem.libelle);
                
                if (existingPrivilegeIndex !== -1) {
                  const existingPrivilege = this.PrivilegeItem[existingPrivilegeIndex];
                  const privilege = this.profileSuperAdmin.listPrivileges.find((item) => item.libelle === existingPrivilege.libelle)
                  existingPrivilege.visibleLecture = innerItem.lecture;
                  existingPrivilege.visibleCreation = innerItem.creation;
                  existingPrivilege.visibleModification = innerItem.modification;
                  existingPrivilege.visibleSuppresion = innerItem.supression;
                  existingPrivilege.active = innerItem.active;
                  existingPrivilege.idEntreprise = innerItem.idEntreprise;
                  if (this.ProfileItem.libelle === 'Super Admin') {

                    existingPrivilege.visibleLectureSuperAdmin = true;
                    existingPrivilege.visibleCreationSuperAdmin = true;
                    existingPrivilege.visibleModificationSuperAdmin = true;
                    existingPrivilege.visibleSuppresionSuperAdmin = true;
                  } else {
                    if (privilege.libelle === 'Entreprise') {

                      existingPrivilege.visibleLectureSuperAdmin = privilege.lecture;
                      existingPrivilege.visibleCreationSuperAdmin = false;
                      existingPrivilege.visibleModificationSuperAdmin = false;
                      existingPrivilege.visibleSuppresionSuperAdmin = false;
                    } else {
                      existingPrivilege.visibleLectureSuperAdmin = privilege.lecture;
                      existingPrivilege.visibleCreationSuperAdmin = privilege.creation;
                      existingPrivilege.visibleModificationSuperAdmin = privilege.modification;
                      existingPrivilege.visibleSuppresionSuperAdmin = privilege.supression;
                    }

                  }
                }
              });
            });
            if (this.ProfileItem.libelle === 'Super Admin') {
              this.PrivilegeItem = this.PrivilegeItem.sort((a, b) => a.order - b.order);
            } else {
              this.PrivilegeItem = this.PrivilegeItem
                .filter(item => item.visibleLectureSuperAdmin === true) // Filtre pour ne garder que les éléments avec visibleLectureSuperAdmin:true
                .sort((a, b) => a.order - b.order); // Tri des éléments restants
            
            }

          });
         



        } else {
          this.ModulesItem = this.storageService.getUtilisateur().entreprise.listModuleInstalleParEntreprise.filter(module => module.active === true);
          const missingPrivilegesds = this.ModulesItem.reduce((acc, element) => {
            const missingDetails = element.listDetailModuleInstalleParEntreprise.filter(detail =>
              detail.active && !this.ProfileItem.listPrivileges.some(pri => pri.libelle === detail.libelle)
            );
            if (missingDetails.length > 0) {
              const missingElement = { ...element };
              missingElement.listDetailModuleInstalleParEntreprise = missingDetails;
              acc.push(missingElement);
            }
            return acc;
          }, []);
          missingPrivilegesds.forEach(element => {
            element.listDetailModuleInstalleParEntreprise.forEach(detail => {
              const privilege = this.profileSuperAdmin.listPrivileges.find((item) => item.libelle === detail.libelle);
              if (detail.active) {
                if (this.ProfileItem.libelle === 'Super Admin') {
                  this.PrivilegeItem.push({
                    module: element.libelle,
                    libelle: detail.libelle,
                    lecture: false,
                    creation: false,
                    modification: false,
                    supression: false,
                    order: detail.code,
                    visibleLecture: detail.lecture,
                    visibleCreation: detail.creation,
                    visibleModification: detail.modification,
                    visibleSuppresion: detail.supression,
                    active: detail.active,
                    idEntreprise: detail.idEntreprise,
                    visibleLectureSuperAdmin: true,
                    visibleCreationSuperAdmin: true,
                    visibleModificationSuperAdmin: true,
                    visibleSuppresionSuperAdmin: true
                  });
                } else {
                  if (privilege) {

                    if (privilege.lecture) {
                      this.PrivilegeItem.push({
                        module: element.libelle,
                        libelle: detail.libelle,
                        lecture: false,
                        creation: false,
                        modification: false,
                        supression: false,
                        order: detail.code,
                        visibleLecture: detail.lecture,
                        visibleCreation: detail.creation,
                        visibleModification: detail.modification,
                        visibleSuppresion: detail.supression,
                        active: detail.active,
                        idEntreprise: detail.idEntreprise,
                        visibleLectureSuperAdmin: privilege.lecture,
                        visibleCreationSuperAdmin: privilege.creation,
                        visibleModificationSuperAdmin: privilege.modification,
                        visibleSuppresionSuperAdmin: privilege.supression
                      });
                    }
                  }
                }
              }
            });
          });
          this.ModulesItem.forEach(outerItem => {
            outerItem.listDetailModuleInstalleParEntreprise.forEach(innerItem => {
              const existingPrivilegeIndex = this.PrivilegeItem.findIndex(privilege => privilege.libelle === innerItem.libelle);
              if (existingPrivilegeIndex !== -1) {
                const existingPrivilege = this.PrivilegeItem[existingPrivilegeIndex];
                const privilege = this.profileSuperAdmin.listPrivileges.find((item) => item.libelle === existingPrivilege.libelle)
                existingPrivilege.visibleLecture = innerItem.lecture;
                existingPrivilege.visibleCreation = innerItem.creation;
                existingPrivilege.visibleModification = innerItem.modification;
                existingPrivilege.visibleSuppresion = innerItem.supression;
                existingPrivilege.active = innerItem.active;
                existingPrivilege.idEntreprise = innerItem.idEntreprise;
                if (this.ProfileItem.libelle === 'Super Admin') {
                  existingPrivilege.visibleLectureSuperAdmin = true;
                  existingPrivilege.visibleCreationSuperAdmin = true;
                  existingPrivilege.visibleModificationSuperAdmin = true;
                  existingPrivilege.visibleSuppresionSuperAdmin = true;
                } else {
                  if (privilege.libelle === 'Entreprise') {
                    existingPrivilege.visibleLectureSuperAdmin = privilege.lecture;
                    existingPrivilege.visibleCreationSuperAdmin = false;
                    existingPrivilege.visibleModificationSuperAdmin = false;
                    existingPrivilege.visibleSuppresionSuperAdmin = false;
                  } else {
                    existingPrivilege.visibleLectureSuperAdmin = privilege.lecture;
                    existingPrivilege.visibleCreationSuperAdmin = privilege.creation;
                    existingPrivilege.visibleModificationSuperAdmin = privilege.modification;
                    existingPrivilege.visibleSuppresionSuperAdmin = privilege.supression;
                  }

                }
              }
            });
          });
          this.PrivilegeItem = this.PrivilegeItem
            .filter(item => item.visibleLectureSuperAdmin === true) // Filtre pour ne garder que les éléments avec visibleLectureSuperAdmin:true
            .sort((a, b) => a.order - b.order); // Tri des éléments restants

        }



        // this.PrivilegeItem.sort((a, b) => a.order - b.order);

        //&& item.active === true 


      });
    })

  }

  onChangeLecture(index: number) {
    if (this.PrivilegeItem[index].lecture) {
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



  modifierProfile() {

    this.profileService.verifierLibelleId(this.ProfileForm.value.libelle, this.ProfileForm.value.id, this.ProfileForm.value.idEntreprise).subscribe((data: boolean) => {
      if (data == true) {
        this.ProfileForm.controls['libelle'].setErrors({ 'libelleExist': true });
      } else {
        const listePrivilegeReduit: Partial<any>[] = this.PrivilegeItem.map(({ id, creation, lecture, libelle, modification, module, order, supression, active, idEntreprise }) => ({
          id,
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
          profile: this.ProfileForm.value,
        }));
        if (this.ProfileForm.value.libelle == 'Super Admin') {
          this.PrivilegeItemTemp = [];
          listePrivileges.forEach(element => {
            if ((element.active)) {
              this.privilegeService.ListePrivilegeByLibelleIdEntreprise(element.libelle, this.storageService.getUtilisateur().idEntrepriseEnCours).subscribe((data: any[]) => {
                const listePrivilege = data;
                listePrivilege.forEach(detail => {
                  if (detail.profile.id != this.ProfileForm.value.id) {
                    if (!element.lecture) {
                      detail.privilege.lecture = 0;
                    }
                    if (!element.creation) {
                      detail.privilege.creation = 0;
                    }
                    if (!element.modification) {
                      detail.privilege.modification = 0;
                    }
                    if (!element.supression) {
                      detail.privilege.supression = 0;
                    }
                    detail.privilege.profile = Object.assign({}, detail.profile, { listPrivileges: [] });
                    delete detail.profile;
                    this.PrivilegeItemTemp.push(detail.privilege);
                  }
                });
                this.privilegeService.saveAllPrivilege(this.PrivilegeItemTemp).subscribe((data: any[]) => {
                  this.PrivilegeItemTemp.splice(0);
                })
              })
            }
          });
        }
        this.privilegeService.saveAllPrivilege(listePrivileges).subscribe((data: any[]) => {

          this.profileService.modifierProfile(this.ProfileForm.value).subscribe((data: any[]) => {
            if (this.storageService.getUtilisateur().profile.id == this.ProfileForm.value.id) {

              this.utilisateurService.getUtilisateur(this.storageService.getUtilisateur().id).subscribe((data: any[]) => {
                window.sessionStorage.removeItem('utilisateur');
                const encodedValue = window.btoa(JSON.stringify(data));
                window.sessionStorage.setItem('utilisateur', encodedValue);
                this.sessionService.updateSession(data);
                this.router.navigate(["/admin/Profile"]);
              });
            }
            else if (this.storageService.getUtilisateur().idEntrepriseEnCours != this.storageService.getUtilisateur().entreprise.id) {
              this.utilisateurService.getUtilisateur(this.storageService.getUtilisateur().id).subscribe((data: any) => {

                let user = data;
                const idEntrepriseEnCours = user.idEntrepriseEnCours;
                this.profileService.getSuperProfile(idEntrepriseEnCours).subscribe((dataProfile: any) => {
                  user.profile = dataProfile;
                  window.sessionStorage.removeItem('utilisateur');
                  const encodedValue = window.btoa(JSON.stringify(user));
                  window.sessionStorage.setItem('utilisateur', encodedValue);
                  this.sessionService.updateSession(data);
                  this.router.navigate(["/admin/Profile"]);
                });
              });
            }
            else {
              this.router.navigate(["/admin/Profile"]);
            }
          });
        });
      }
    });

  }
}



