import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';
import { EntrepriseService } from 'src/app/service/entreprise.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';
import { PostService } from 'src/app/service/post.service';
import { ProfileService } from 'src/app/service/profile.service';
import { CandidatService } from 'src/app/service/candidat.service';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { ImageTransform, ImageCroppedEvent, base64ToFile, Dimensions, CropperPosition } from 'ngx-image-cropper';


@Component({
  selector: 'app-ajouter-candidat',
  templateUrl: './ajouter-candidat.component.html',
  styleUrls: ['./ajouter-candidat.component.scss']
})
export class AjouterCandidatComponent {

  UtilisateurItem: any;
  CandidatItem: any;
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

  CandidatForm = this.fb.group(
    {
      id:[],
      nom: ["", [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      prenom: ['', Validators.required],
      gsm: ['', Validators.required],
      cin: ['', Validators.required],
      adresse: ['', Validators.required],
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

  constructor(private storageService: StorageService, public router: Router, private entrepriseService: EntrepriseService, private profileService: ProfileService, private postService: PostService, private candidatService: CandidatService, private fb: FormBuilder, private translate: TranslateService, private languageService: LanguageServiceService) { this.languageService.language$.subscribe((lang) => { translate.use(lang); }); }
  ngOnInit() { this.loadData(); }


  get nom() {
    return this.CandidatForm.get("nom");
  }
  get prenom() {
    return this.CandidatForm.get("prenom");
  }
  get email() {
    return this.CandidatForm.get("email");
  }
  get gsm() {
    return this.CandidatForm.get("gsm");
  }
  get cin() {
    return this.CandidatForm.get("cin");
  }
  get adresse() {
    return this.CandidatForm.get("adresse");
  }
  get profile() {
    return this.CandidatForm.get("profile");
  }
  get poste() {
    return this.CandidatForm.get("poste");
  }

  get role() {
    return this.CandidatForm.get("role");
  }



  loadData() {
    this.profileService.getData().subscribe((data: any[]) => {
      if (this.storageService.getUser().profile.libelle === 'Super Admin') {
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


  ajouterCandidat() {
    this.entrepriseService.getEntreprise(this.storageService.getUtilisateur().idEntrepriseEnCours).subscribe((dataEntreprise: any) => {
      const Entreprise = dataEntreprise;
      this.CandidatForm.controls['entreprise'].setValue(Entreprise);
      this.CandidatForm.controls['idEntrepriseEnCours'].setValue(Entreprise.id);
      this.CandidatForm.controls['libelleEntrepriseEnCours'].setValue(Entreprise.libelle);
  
      
      this.CandidatForm.controls['profile'].setValue(this.ProfileItem.find((item) => item.libelle === this.CandidatForm.value.profile));
  
      this.CandidatForm.controls['poste'].setValue(this.selectPoste);
      this.CandidatForm.controls['id'].setValue(Math.floor(Math.random() * 1000) + "" + Date.now());
      this.candidatService.verifierEmail(this.CandidatForm.value.email).subscribe((data: boolean) => {
        if (data == true) {
          this.CandidatForm.controls['email'].setErrors({ 'emailTaken': true });
        } else {
          if (this.CandidatForm.get('role').value !== null && this.CandidatForm.get('role').value !== '') {
            
  
            this.candidatService.saveCandidat(this.CandidatForm.value).subscribe((data: any[]) => {
            });
          } else {
            this.candidatService.saveCandidat(this.CandidatForm.value).subscribe((data: any[]) => {
            });
          }
          this.router.navigate(["/Candidat"]);

        }
      });
    });

  }


  onChangePoste(event) {
    this.selectPoste = event
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
      this.CandidatForm.controls['image'].setValue(timestamp + file.name.substring(file.name.length - 4));
    }
    this.candidatService.saveImage(this.Image).subscribe((data: any[]) => { });
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






