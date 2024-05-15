import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Dimensions, ImageCroppedEvent } from 'ngx-image-cropper';
import { StorageService } from 'src/app/auth/login/storage.service';
import { DomaineService } from 'src/app/service/domaine.service';
import { EntrepriseService } from 'src/app/service/entreprise.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-modifier-domaine',
  templateUrl: './modifier-domaine.component.html',
  styleUrls: ['./modifier-domaine.component.scss']
})
export class ModifierDomaineComponent {


 
  id: number;
  DomaineItem: any;
  currentImageData: any; // Les données de l'image existante
  croppedImage: any;
  imageChangedEvent: any;
  showCropper: boolean = false;
  Image: any = null;

 
  
  
  DomaineForm = this.fb.group(
    {
      id : [0],
      libelle: ["",[Validators.required]],
      code:  ['', [Validators.required]],
      entite:  [''],
      description: [''],
      codePostal: [''],
      telephone: [''],
      fax: [''],
      email: [''],
      latitude: ['0'],
      longitude: ['0'],
      matriculeFiscale: [''],
      representantLegal: [''],
      capital: [0],
      liee: [false],
      dateSynch: [0],
      logo: [''],
      statut: [''],
      situationJuridique: [false],
      valeurNominale: [0],
      entreprise : ['', [Validators.required]],
      supression : [0]
    });

    get libelle() {
      return this.DomaineForm.get("libelle");
    }
    get entreprise() {
      return this.DomaineForm.get("entreprise");
    }
    get code() {
      return this.DomaineForm.get("code");
    }
    get entite() {
      return this.DomaineForm.get("entite");
    }

  constructor(private utilisateurService : UtilisateurService ,private  storageService : StorageService ,public router: Router ,private routeActivate: ActivatedRoute, private entrepriseService : EntrepriseService , private  domaineService : DomaineService, private fb: FormBuilder ,  private translate: TranslateService ,  private languageService: LanguageServiceService) 
  {  this.languageService.language$.subscribe((lang) => {translate.use(lang);});}

  ngOnInit() {
    this.id = +this.routeActivate.snapshot.paramMap.get('id');
    this.onSelect(this.id);

    
    
    
  }
  onSelect(idDomaine: any){
    this.domaineService.getDomaine(idDomaine).subscribe((data: any[]) => {
      this.DomaineItem = data;
      this.croppedImage = './assets/images/' + this.DomaineItem.logo;
      this.DomaineForm.setValue({
        id: this.DomaineItem.id,
        libelle: this.DomaineItem.libelle,
        code: this.DomaineItem.code,
        entite: this.DomaineItem.entite,
        description: this.DomaineItem.description,
        codePostal: this.DomaineItem.codePostal,
        telephone: this.DomaineItem.telephone,
        fax: this.DomaineItem.fax,
        email: this.DomaineItem.email,
        latitude: this.DomaineItem.latitude,
        longitude: this.DomaineItem.longitude,
        matriculeFiscale: this.DomaineItem.matriculeFiscale,
        representantLegal: this.DomaineItem.representantLegal,
        capital: this.DomaineItem.capital,
        liee: this.DomaineItem.liee,
        dateSynch: this.DomaineItem.dateSynch,
        logo: this.DomaineItem.logo,
        statut: this.DomaineItem.statut,
        situationJuridique: this.DomaineItem.situationJuridique,
        valeurNominale: this.DomaineItem.valeurNominale,
        entreprise: this.DomaineItem.entreprise,
        supression : this.DomaineItem.supression 
      });
    });


   
  }








   modifierDomaine(){
  
     this.domaineService.verifierLibelleId(this.DomaineForm.value.libelle,this.DomaineForm.value.id,this.storageService.getUtilisateur().idEntrepriseEnCours).subscribe((data: boolean) => {
      if(data == true ){
        this.DomaineForm.controls['libelle'].setErrors({ 'libelleExist': true });
      }else {
        this.domaineService.modifierDomaine(this.DomaineForm.value).subscribe((data: any[]) => {
          this.router.navigate(["/Domaine"]);
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
      this.DomaineForm.controls['logo'].setValue(timestamp + file.name.substring(file.name.length - 4));
    }
    this.utilisateurService.saveImage(this.Image).subscribe(() => {  });
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


