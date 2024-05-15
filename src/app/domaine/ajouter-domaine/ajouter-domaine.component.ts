import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { map, Observable, of } from 'rxjs';
import { StorageService } from 'src/app/auth/login/storage.service';
import { DomaineService } from 'src/app/service/domaine.service';
import { EntrepriseService } from 'src/app/service/entreprise.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-ajouter-domaine',
  templateUrl: './ajouter-domaine.component.html',
  styleUrls: ['./ajouter-domaine.component.scss']
})
export class AjouterDomaineComponent {

  DomaineItem: any;
  Image: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  DomaineForm = this.fb.group(
    {
      libelle: ["", [Validators.required]],
      code: ['', [Validators.required]],
      entite: [''],
      description: ['---'],
      codePostal: [''],
      telephone: [''],
      fax: [''],
      email: [''],
      latitude: ['0'],
      longitude: ['0'],
      matriculeFiscale: [''],
      representantLegal: [''],
      supprimer: [0],
      capital: [0],
      liee: [false],
      dateSynch: [0],
      logo: ['company.png'],
      statut: [false],
      situationJuridique: [false],
      valeurNominale: [0],
      entreprise: [null],
      supression: [0]




    });

  constructor(private utilisateurService : UtilisateurService,private storageService : StorageService,public router: Router, private DomaineService: DomaineService, private entrepriseService: EntrepriseService, private fb: FormBuilder, private translate: TranslateService, private languageService: LanguageServiceService) { this.languageService.language$.subscribe((lang) => { translate.use(lang); }); }
  ngOnInit() { this.loadData(); }

  get libelle() {
    return this.DomaineForm.get("libelle");
  }
  get entreprise() {
    return this.DomaineForm.get("entreprise");
  }
  get code() {
    return this.DomaineForm.get("code");
  }
 



  loadData() {
    this.DomaineService.getData().subscribe((data: any[]) => {
      this.DomaineItem = data;
    });

    this.croppedImage = './images/company.png' ;

  }


  ajouterDomaine() {
  

    this.entrepriseService.getEntreprise(this.storageService.getUtilisateur().idEntrepriseEnCours).subscribe((dataEntreprise: any) => {
      this.DomaineForm.controls['entreprise'].setValue(dataEntreprise);

      this.DomaineService.verifierLibelle(this.DomaineForm.value.libelle).subscribe((data: boolean) => {
        if (data == true) {
  
          this.DomaineForm.controls['libelle'].setErrors({ 'domaineTaken': true });
        } else {
  
          this.DomaineService.saveDomaine(this.DomaineForm.value).subscribe((data: any[]) => {
            this.router.navigate(["/Domaine"]);
          });
        }
      }); 

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
      this.DomaineForm.controls['logo'].setValue(timestamp + file.name.substring(file.name.length - 4));
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




}




