import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { map, Observable, of } from 'rxjs';
import { StorageService } from 'src/app/auth/login/storage.service';
import { EntrepriseService } from 'src/app/service/entreprise.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';
import { ModuleInstalleParEntrepriseService } from 'src/app/service/module-installe-par-entreprise.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-ajouter-entreprise',
  templateUrl: './ajouter-entreprise.component.html',
  styleUrls: ['./ajouter-entreprise.component.scss']
})
export class AjouterEntrepriseComponent {


  EntrepriseItem: any;
  ModulesItem!: any;
  subModulesItem!: any;
  Image: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};
  paramBatiment: any = false;

  EntrepriseForm = this.fb.group(
    {
      libelle: ["", [Validators.required]],
      logo: ['company.png'],
      matriculeFiscale: ["", [Validators.required]],
      representantLegal: ["", [Validators.required]],
      dateCreation: [new Date().toISOString()],
      dateSynchro: [''],
      supprimer: [''],
      codePostal: [''],
      adresse: [''],
      siteWeb: [''],
      email: [''],
      codeTelephonique: [''],
      telephone: [''],
      fax: [''],
      description: ['---'],
      supression: [0],
      listModuleInstalleParEntreprise: [],
      paramBatiment: [0]


    });

  get libelle() {
    return this.EntrepriseForm.get("libelle");
  }

  get matriculeFiscale() {
    return this.EntrepriseForm.get("matriculeFiscale");
  }

  get representantLegal() {
    return this.EntrepriseForm.get("representantLegal");
  }

  constructor(private utilisateurService : UtilisateurService,private moduleInstalleParEntrepriseService: ModuleInstalleParEntrepriseService, public router: Router, private entrepriseService: EntrepriseService, private fb: FormBuilder, private translate: TranslateService, private languageService: LanguageServiceService, private storageService: StorageService) { this.languageService.language$.subscribe((lang) => { translate.use(lang); }); }
  ngOnInit() { this.loadData(); }




  loadData() {
    this.entrepriseService.getData().subscribe((data: any[]) => {
      this.EntrepriseItem = data;
    });
    this.ModulesItem = this.storageService.getUtilisateur().entreprise.listModuleInstalleParEntreprise;


    this.ModulesItem.forEach(element => {
      element.active = false;
      element.listDetailModuleInstalleParEntreprise.forEach(element => {
        element.active = false;
        element.lecture = false;
        element.modification = false;
        element.supression = false;
        element.activation = false;
        element.creation = false;
      });
      element.listDetailModuleInstalleParEntreprise = element.listDetailModuleInstalleParEntreprise.map(({ id, ...rest }) => rest);
    });

    this.ModulesItem = this.ModulesItem.map(({ id, ...rest }) => rest);

    this.croppedImage = './images/company.png' ;
  }

  onChange(index: number) {
    if (this.ModulesItem[index].active) {
      this.ModulesItem[index].listDetailModuleInstalleParEntreprise.forEach(element => {
        element.active = false;
        element.modification = false;
        element.supression = false;
        element.creation = false;
        element.lecture = false;
      });
    }

if ((this.ModulesItem[index].libelle === 'TempsRéel' && !this.ModulesItem[index].active) || ( this.ModulesItem[index].libelle === 'Historique' && !this.ModulesItem[index].active)  ) {
  this.ModulesItem[index].listDetailModuleInstalleParEntreprise.forEach(element => {
    element.active = true;
    element.modification = false;
    element.supression = false;
    element.creation = false;
    element.lecture = true;
  });
}

    this.ModulesItem[index].active = !this.ModulesItem[index].active
  }


  onChangeSubItem(i: number, j: number) {


    if (this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].active) {
      if (this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].libelle == 'Batiment') {
        this.paramBatiment = false;
      }
      this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].modification = false;
      this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].supression = false;
      this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].creation = false;
      this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].lecture = false;

    }else {
        this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].modification = true;
        this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].supression = true;
        this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].creation = true;
        this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].lecture = true;
    }

    this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].active = !this.ModulesItem[i].listDetailModuleInstalleParEntreprise[j].active

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



  ajouterEntreprise() {

    this.entrepriseService.verifierLibelle(this.EntrepriseForm.value.libelle).subscribe((data: boolean) => {
      if (data == true) {

        this.EntrepriseForm.controls['libelle'].setErrors({ 'entrepriseTaken': true });
      } else {

         this.EntrepriseForm.controls['listModuleInstalleParEntreprise'].setValue([]);
         this.EntrepriseForm.controls['paramBatiment'].setValue(this.paramBatiment);
        this.entrepriseService.saveEntreprise(this.EntrepriseForm.value).subscribe((data: any[]) => {

          this.ModulesItem = this.ModulesItem.map((objet) => ({
            ...objet,
            entreprise: data,
          }));


          this.ModulesItem.forEach(element => {
            var detail = element.listDetailModuleInstalleParEntreprise;
            element.listDetailModuleInstalleParEntreprise = [];
            this.moduleInstalleParEntrepriseService.saveModule(element).subscribe((dataModule: any[]) => {
              detail.forEach(elementDetail => {
                elementDetail.moduleInstalleParEntreprise = dataModule;
                if (elementDetail.active && !elementDetail.lecture) {
                  elementDetail.active = !elementDetail.active;
                }
                elementDetail.idEntreprise =this.storageService.getUtilisateur().entreprise.id ;
              });
              this.moduleInstalleParEntrepriseService.saveAllDetailModule(detail).subscribe((dataDetail: any[]) => { });
            });
          });
          this.router.navigate(["/admin/Entreprise"]);
        }); 
      }
    });
  }



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
    this.utilisateurService.saveImage(this.Image).subscribe((data: any[]) => { });
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




