import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';
import { EntrepriseService } from 'src/app/service/entreprise.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';
import { ModuleInstalleParEntrepriseService } from 'src/app/service/module-installe-par-entreprise.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { PrivilegeService } from 'src/app/service/privilege.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ProfileService } from 'src/app/service/profile.service';
import { Dimensions, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-modifier-entreprise',
  templateUrl: './modifier-entreprise.component.html',
  styleUrls: ['./modifier-entreprise.component.scss']
})
export class ModifierEntrepriseComponent {




  id: number;
  EntrepriseItem: any;
  ModulesItem!: any;
  subModulesItem!: any;
  privilegesItem!: any;
  PrivilegeItemTemp = [];
  currentImageData: any; // Les données de l'image existante
  croppedImage: any;
  imageChangedEvent: any;
  showCropper: boolean = false;
  Image: any = null;
  paramBatiment: any = false;

  EntrepriseForm = this.fb.group(
    {
      id: [0],
      libelle: ["", [Validators.required]],
      logo: [''],
      matriculeFiscale: ["", [Validators.required]],
      representantLegal: ["", [Validators.required]],
      dateCreation: [new Date().toISOString()],
      dateSynchro: [''],
      codePostal: [''],
      adresse: [''],
      siteWeb: [''],
      email: [''],
      codeTelephonique: [''],
      telephone: [''],
      fax: [''],
      description: ['---'],
      supression: [0],
      paramBatiment: [0],
      listModuleInstalleParEntreprise: []
    });



  constructor(private profileService: ProfileService, private privilegeService: PrivilegeService, private utilisateurService: UtilisateurService, private storageService: StorageService, private moduleInstalleParEntrepriseService: ModuleInstalleParEntrepriseService, public router: Router, private routeActivate: ActivatedRoute, private entrepriseService: EntrepriseService, private fb: FormBuilder, private translate: TranslateService, private languageService: LanguageServiceService, private sessionService: SessionService) { this.languageService.language$.subscribe((lang) => { translate.use(lang); }); }

  ngOnInit() {
    this.id = +this.routeActivate.snapshot.paramMap.get('id');
    this.onSelect(this.id);
  }
  onSelect(idEntreprise: any) {
    this.entrepriseService.getEntreprise(idEntreprise).subscribe((data: any[]) => {
      this.EntrepriseItem = data;
      this.croppedImage = './images/' + this.EntrepriseItem.logo;
      this.ModulesItem = this.EntrepriseItem.listModuleInstalleParEntreprise;
      this.EntrepriseForm.setValue({
        id: this.EntrepriseItem.id,
        libelle: this.EntrepriseItem.libelle,
        logo: this.EntrepriseItem.logo,
        matriculeFiscale: this.EntrepriseItem.matriculeFiscale,
        representantLegal: this.EntrepriseItem.representantLegal,
        dateCreation: this.EntrepriseItem.dateCreation,
        dateSynchro: this.EntrepriseItem.dateSynchro,
        codePostal: this.EntrepriseItem.codePostal,
        adresse: this.EntrepriseItem.adresse,
        siteWeb: this.EntrepriseItem.siteWeb,
        email: this.EntrepriseItem.email,
        codeTelephonique: this.EntrepriseItem.codeTelephonique,
        telephone: this.EntrepriseItem.telephone,
        fax: this.EntrepriseItem.fax,
        description: this.EntrepriseItem.description,
        supression: this.EntrepriseItem.supression,
        listModuleInstalleParEntreprise: this.EntrepriseItem.listModuleInstalleParEntreprise,
        paramBatiment: this.EntrepriseItem.paramBatiment,
      })

      this.paramBatiment = this.EntrepriseItem.paramBatiment;
    });
  }

  get libelle() {
    return this.EntrepriseForm.get("libelle");
  }


  get matriculeFiscale() {
    return this.EntrepriseForm.get("matriculeFiscale");
  }

  get representantLegal() {
    return this.EntrepriseForm.get("representantLegal");
  }

  modifierEntreprise() {
    this.entrepriseService.verifierLibelleId(this.EntrepriseForm.value.libelle, this.EntrepriseForm.value.id).subscribe((data: boolean) => {
      if (data == true) {
        this.EntrepriseForm.controls['libelle'].setErrors({ 'libelleExist': true });
      } else {


        this.EntrepriseForm.controls['paramBatiment'].setValue(this.paramBatiment);
        this.entrepriseService.modifierEntreprise(this.EntrepriseForm.value).subscribe((data: any[]) => {
          this.ModulesItem = this.ModulesItem.map((objet) => ({
            ...objet,
            entreprise: data,
          }));
          this.ModulesItem.forEach(element => {
            var detail = element.listDetailModuleInstalleParEntreprise;
            element.listDetailModuleInstalleParEntreprise = [];
            this.moduleInstalleParEntrepriseService.saveModule(element).subscribe((data: any[]) => {
              detail.forEach(elementDetail => {

                elementDetail.moduleInstalleParEntreprise = data;
                if (elementDetail.active && !elementDetail.lecture) {
                  elementDetail.active = !elementDetail.active;
                }
                if (!element.active) {
                  elementDetail.active = false;
                  elementDetail.lecture = false;
                  elementDetail.creation = false;
                  elementDetail.modification = false;
                  elementDetail.supression = false;
                }
                this.privilegeService.ListePrivilegeByLibelleIdEntreprise(elementDetail.libelle, this.storageService.getUtilisateur().idEntrepriseEnCours).subscribe((data: any[]) => {
                  this.PrivilegeItemTemp = [];

                  data.forEach(element => {
                    element.active = elementDetail.active;
                    if (!elementDetail.active) {
                      element.lecture = false;
                      element.creation = false;
                      element.modification = false;
                      element.supression = false;
                    }
                    if (!elementDetail.lecture) {
                      element.lecture = false;
                    }
                    if (!elementDetail.creation) {
                      element.creation = false;
                    }
                    if (!elementDetail.modification) {
                      element.modification = false;
                    }
                    if (!elementDetail.supression) {
                      element.supression = false;
                    }
                    element.profile = Object.assign({}, element.profile, { listPrivileges: [] });
                    //delete element.profile;
                    this.PrivilegeItemTemp.push(element);

                  });
                  this.privilegeService.saveAllPrivilege(this.PrivilegeItemTemp).subscribe((data: any[]) => {
                    this.moduleInstalleParEntrepriseService.saveAllDetailModule(detail).subscribe((data: any[]) => {
                      if (this.storageService.getUtilisateur().idEntrepriseEnCours == this.EntrepriseForm.value.id) {
                        this.utilisateurService.getUtilisateur(this.storageService.getUtilisateur().id).subscribe((data: any) => {
                          let user = data;
                          const idEntrepriseEnCours = user.idEntrepriseEnCours;
                          this.profileService.getSuperProfile(idEntrepriseEnCours).subscribe((dataProfile: any) => {
                            user.profile = dataProfile;
                            window.sessionStorage.removeItem('utilisateur');
                            const encodedValue = window.btoa(JSON.stringify(user));
                            window.sessionStorage.setItem('utilisateur', encodedValue);
                            this.sessionService.updateSession(data);
                            this.router.navigate(["/Entreprise"]);
                          });
                        });
                      } else {
                        this.router.navigate(["/Entreprise"])
                      }
                    });
                    this.PrivilegeItemTemp = [];
                  });
                });
              });
            });
          });
        });
      }
    });
  }



  onChange(index: number) {
    this.PrivilegeItemTemp = [];
    this.ModulesItem[index].active = !this.ModulesItem[index].active;

    if (!this.ModulesItem[index].active) {
      this.privilegeService.ListePrivilegeByModuleIdEntreprise(this.ModulesItem[index].libelle, this.storageService.getUtilisateur().entreprise.id).subscribe((data: any[]) => {
        this.privilegesItem = data;
        data.forEach(element => {
          element.active = false;
          element.lecture = false;
          element.creation = false;
          element.modification = false;
          element.supression = false;
          element.profile = Object.assign({}, element.profile, { listPrivileges: [] });
          //delete element.profile;
          this.PrivilegeItemTemp.push(element);
        });
        this.privilegeService.saveAllPrivilege(this.PrivilegeItemTemp).subscribe((data: any[]) => {
        });
      });

      this.ModulesItem[index].listDetailModuleInstalleParEntreprise.forEach(element => {
        element.active = false;
        element.lecture = false;
        element.creation = false;
        element.modification = false;
        element.supression = false;
      });
    }


    if ((this.ModulesItem[index].libelle === 'TempsRéel' && this.ModulesItem[index].active) || (this.ModulesItem[index].libelle === 'Historique' && this.ModulesItem[index].active)) {
      this.ModulesItem[index].listDetailModuleInstalleParEntreprise.forEach(element => {
        element.active = true;
        element.modification = false;
        element.supression = false;
        element.creation = false;
        element.lecture = true;
      });

    }



    this.PrivilegeItemTemp = [];
  }


  onChangeSubItem(i: number, j: number) {

    this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].active = !this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].active



    if (!this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].active) {
      if (this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].libelle == 'Batiment') {
        this.paramBatiment = false;
      }
      this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].active = false;
      this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].modification = false;
      this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].supression = false;
      this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].creation = false;
      this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].lecture = false;

    } else {
      if (this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].libelle === 'Alertes' || this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].libelle === 'AlertesSMS' || this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].libelle === 'AlertesEmail') {
        this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].modification = false;
        this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].supression = false;
        this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].creation = false;
        this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].lecture = true;
      } else {
        this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].modification = true;
        this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].supression = true;
        this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].creation = true;
        this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].lecture = true;
      }

    }
  }





  /*  onChangeSubItemLecture(i: number, j: number) {
 
     if (this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].lecture) {
       this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].modification = false;
       this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].supression = false;
       this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].creation = false;
     }
     this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].lecture = !this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].lecture
   }
 
   onChangeSubItemModification(i: number, j: number) {
     if (!this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].modification) {
       this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].lecture = true;
     }
     this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].modification = !this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].modification
 
   }
 
   onChangeSubItemSupression(i: number, j: number) {
 
     if (!this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].supression) {
       this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].lecture = true;
     }
 
 
     this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].supression = !this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].supression
   }
 
   onChangeSubItemCreation(i: number, j: number) {
     if (!this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].creation) {
       this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].lecture = true;
     }
     this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].creation = !this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].creation
   } */



  fileChangeEvent(event: any): void {
    let files = null;
    this.imageChangedEvent = event;
    files = event.target.files
    this.Image = null;
    this.Image = new FormData();
    const timestamp = new Date().getTime().toString();
    for (const file of files) {
      this.Image.append('files', file, timestamp + file.name.substring(file.name.length - 4));
      this.EntrepriseForm.controls['logo'].setValue(timestamp + file.name.substring(file.name.length - 4));
    }
    this.utilisateurService.saveImage(this.Image).subscribe(() => { });
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    this.showCropper = true;

  }

  cropperReady(sourceImageDimensions: Dimensions) {
  }

  loadImageFailed() {
  }




  onChangeDetailBatiment() {
    this.paramBatiment = !this.paramBatiment
  }

}



