import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';
import { EntrepriseService } from 'src/app/service/entreprise.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';
import { PostService } from 'src/app/service/post.service';
import { ProfileService } from 'src/app/service/profile.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { ImageTransform, ImageCroppedEvent, base64ToFile, Dimensions, CropperPosition } from 'ngx-image-cropper';


@Component({
  selector: 'app-ajouter-utilisateur',
  templateUrl: './ajouter-utilisateur.component.html',
  styleUrls: ['./ajouter-utilisateur.component.scss']
})
export class AjouterUtilisateurComponent {

  UtilisateurItem: any;
  EntrepriseItem: any;
  ProfileItem: any;
  PosteItem: any;
  filenames: string[] = [];
  fileStatus = { status: '', requestType: '', percent: 0 };
  selectPoste: any;
  Image: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {};

  UtilisateurForm = this.fb.group(
    {
      id:[],
      nom: ["", [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      prenom: ['', Validators.required],
      statut: ['inactive'],
      langue: ['fr'],
      dateNaissance: [null],
      passwd: ['$2a$10$bpcserBDwo04c968akdnBOjv8aFgtvs5Ja.tkx84g7B4hJU5RmyqG'],
      profile: [null, Validators.required],
      poste: [null, Validators.required],
      entreprise: [null],
      supression: [0],
      role: [null],
      image: ['user.png'],
      idEntrepriseEnCours: [''],
      libelleEntrepriseEnCours: [0],
      suivre: [false],
    });

  constructor(private storageService: StorageService, public router: Router, private entrepriseService: EntrepriseService, private profileService: ProfileService, private postService: PostService, private utilisateurService: UtilisateurService, private fb: FormBuilder, private translate: TranslateService, private languageService: LanguageServiceService) { this.languageService.language$.subscribe((lang) => { translate.use(lang); }); }
  ngOnInit() { this.loadData(); }


  get nom() {
    return this.UtilisateurForm.get("nom");
  }
  get prenom() {
    return this.UtilisateurForm.get("prenom");
  }
  get email() {
    return this.UtilisateurForm.get("email");
  }
  get profile() {
    return this.UtilisateurForm.get("profile");
  }
  get poste() {
    return this.UtilisateurForm.get("poste");
  }

  get role() {
    return this.UtilisateurForm.get("role");
  }



  loadData() {
    this.profileService.getData().subscribe((data: any[]) => {
      if (this.storageService.getUtilisateur().profile.libelle === 'Super Admin') {
        this.ProfileItem = data;
      } else {
        this.ProfileItem = data.filter(pro => pro.libelle != 'Super Admin');
      }
    });



    this.postService.getData().subscribe((data: any[]) => {
      this.PosteItem = data;
    });

    this.croppedImage = './images/user.png' ;

  }


  ajouterUtilisateur() {
    this.entrepriseService.getEntreprise(this.storageService.getUtilisateur().idEntrepriseEnCours).subscribe((dataEntreprise: any) => {
      const Entreprise = dataEntreprise;
      this.UtilisateurForm.controls['entreprise'].setValue(Entreprise);
      this.UtilisateurForm.controls['idEntrepriseEnCours'].setValue(Entreprise.id);
      this.UtilisateurForm.controls['libelleEntrepriseEnCours'].setValue(Entreprise.libelle);
  
      
      this.UtilisateurForm.controls['profile'].setValue(this.ProfileItem.find((item) => item.libelle === this.UtilisateurForm.value.profile));
  
      this.UtilisateurForm.controls['poste'].setValue(this.selectPoste);
      this.UtilisateurForm.controls['id'].setValue(Math.floor(Math.random() * 1000) + "" + Date.now());
      this.utilisateurService.verifierEmail(this.UtilisateurForm.value.email).subscribe((data: boolean) => {
        if (data == true) {
          this.UtilisateurForm.controls['email'].setErrors({ 'emailTaken': true });
        } else {
          if (this.UtilisateurForm.get('role').value !== null && this.UtilisateurForm.get('role').value !== '') {
            // this.responsableService.saveResponsable(this.UtilisateurForm.value).subscribe((data: any[]) => {
            // });
  
            this.utilisateurService.saveUtilisateur(this.UtilisateurForm.value).subscribe((data: any[]) => {
            });
          } else {
            this.utilisateurService.saveUtilisateur(this.UtilisateurForm.value).subscribe((data: any[]) => {
            });
          }
          this.router.navigate(["/Utilisateur"]);

        }
      });
    });

  }





  // define a function to upload files jjjj
 /*  onUploadFiles(files: File[]): void {
    this.Image = null;
    this.Image = new FormData();
    const timestamp = new Date().getTime().toString();
    for (const file of files) {
      this.Image.append('files', file, timestamp + file.name.substring(file.name.length - 4));
      this.UtilisateurForm.controls['image'].setValue(timestamp + file.name.substring(file.name.length - 4));
    }


  } */



  onChangePoste(event) {
    this.selectPoste = event
  }





  /*  private updateStatus(loaded: number, total: number, requestType: string): void {
     this.fileStatus.status = 'progress';
     this.fileStatus.requestType = requestType;
     this.fileStatus.percent = Math.round(100 * loaded / total);
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
      this.UtilisateurForm.controls['image'].setValue(timestamp + file.name.substring(file.name.length - 4));
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





