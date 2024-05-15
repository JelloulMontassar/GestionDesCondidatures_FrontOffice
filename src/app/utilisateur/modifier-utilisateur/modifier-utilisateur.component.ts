import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Dimensions, ImageCroppedEvent } from 'ngx-image-cropper';
import { AuthService } from 'src/app/auth/login/auth.service';
import { StorageService } from 'src/app/auth/login/storage.service';
import { EntrepriseService } from 'src/app/service/entreprise.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';
import { PostService } from 'src/app/service/post.service';
import { ProfileService } from 'src/app/service/profile.service';
import { UserNavBarService } from 'src/app/service/user-nav-bar.service';
import { UtilisateurService } from 'src/app/service/utilisateur.service';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-modifier-utilisateur',
  templateUrl: './modifier-utilisateur.component.html',
  styleUrls: ['./modifier-utilisateur.component.scss']
})
export class ModifierUtilisateurComponent {
  id: number;
  UtilisateurItem: any;
  EntrepriseItem: any;
  ProfileItem: any;
  PosteItem: any;
  EntrepriseSelect: any;
  ProfileSelect: any;
  PosteSelect: any;
  suivre: any;
  UtilisateurTemp: any;
  currentImageData: any; 
  croppedImage: any;
  imageChangedEvent: any;
  showCropper: boolean = false;
  Image: any = null;
  privilege: any;
  SuperAdminPrivilege = false;

  UtilisateurForm = this.fb.group(
    {
      id: [],
      nom: ["", [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      prenom: ['', Validators.required],
      statut: ['active'],
      langue: ['fr'],
      dateNaissance: [new Date()],
      passwd: [''],
      profile: ['', Validators.required],
      poste: ['', Validators.required],
      entreprise: ['', Validators.required],
      supression: [0],
      idEntrepriseEnCours: [''],
      libelleEntrepriseEnCours: [0],
      suivre: [false],
      activer: [false],
      image: [''],
    });


  constructor(private sessionService: SessionService, public router: Router, private routeActivate: ActivatedRoute, private entrepriseService: EntrepriseService, private profileService: ProfileService, private postService: PostService, private utilisateurService: UtilisateurService, private fb: FormBuilder, private translate: TranslateService, private languageService: LanguageServiceService, private storageService: StorageService, private userService: UserNavBarService) 
  {
     this.languageService.language$.subscribe((lang) => { translate.use(lang); }); 
    
     this.privilege  = this.storageService.getUtilisateur().profile.listPrivileges.find(item => item.libelle === 'Utilisateur');
     if (this.storageService.getUtilisateur().profile.libelle === "Super Admin" ) {
      //this.storageService.getUtilisateur().profile.id === 1 || this.storageService.getUtilisateur().profile.id === 2091
       this.SuperAdminPrivilege = true;
     }
    }

  ngOnInit() {
    this.id = +this.routeActivate.snapshot.paramMap.get('id');
    this.entrepriseService.getAllEntreprise().subscribe((dataEntreprises: any) => {
      this.EntrepriseItem = dataEntreprises;
    });
    this.onSelect(this.id);
    this.loadData();
  }
  onSelect(idUtilisateur: any) {

    this.utilisateurService.getUtilisateur(idUtilisateur).subscribe((data: any[]) => {

      this.UtilisateurItem = data;
      this.EntrepriseSelect = this.UtilisateurItem.entreprise

      this.croppedImage = './images/' + this.UtilisateurItem.image;
      this.ProfileSelect = this.UtilisateurItem.profile
      this.PosteSelect = this.UtilisateurItem.poste
      this.UtilisateurForm.setValue({
        id: this.UtilisateurItem.id,
        nom: this.UtilisateurItem.nom,
        email: this.UtilisateurItem.email,
        prenom: this.UtilisateurItem.prenom,
        statut: this.UtilisateurItem.statut,
        langue: this.UtilisateurItem.langue,
        dateNaissance: this.UtilisateurItem.dateNaissance,
        passwd: this.UtilisateurItem.passwd,
        profile: this.UtilisateurItem.profile.libelle,
        poste: this.UtilisateurItem.poste.libelle,
        entreprise: this.UtilisateurItem.entreprise,
        supression: this.UtilisateurItem.supression,
        idEntrepriseEnCours: this.UtilisateurItem.idEntrepriseEnCours,
        libelleEntrepriseEnCours: this.UtilisateurItem.libelleEntrepriseEnCours,
        suivre: this.UtilisateurItem.suivre,
        activer:this.UtilisateurItem.activer,
        image: this.UtilisateurItem.image,
      });
      this.suivre = this.UtilisateurItem.suivre;
    });
  }

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

  onPosteChange(selectedPoste: any) {
    this.PosteSelect = selectedPoste;
  }

  onProfileChange(profile: any) {
    this.ProfileSelect = profile;
  }


  onEntrepriseChange(entreprise: any) {
    this.UtilisateurForm.controls['idEntrepriseEnCours'].setValue(entreprise.id);
    this.UtilisateurForm.controls['libelleEntrepriseEnCours'].setValue(entreprise.libelle);
  }
  onChangeActivation() {
    // Obtenez la valeur actuelle du champ activer
    const isActive = this.UtilisateurForm.get('activer')?.value;

    if (isActive) {
      this.UtilisateurForm.controls['activer'].setValue(true);      
    } else {
      this.UtilisateurForm.controls['activer'].setValue(false);
    }
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
  }




  modifierUtilisateur() {
    this.UtilisateurForm.value.poste = this.PosteSelect;
    this.UtilisateurForm.value.profile = this.ProfileSelect;
    this.utilisateurService.verifierEmailId(this.UtilisateurForm.value.email, this.UtilisateurForm.value.id).subscribe((data: boolean) => {
      if (data == true) {
        this.UtilisateurForm.controls['email'].setErrors({ 'emailExist': true });
      } else {
            this.updateUtilisateurForm();
        
      

      }
    });
  }


  updateUtilisateurForm() {
    this.utilisateurService.modifierUtilisateur(this.UtilisateurForm.value).subscribe(() => {
      const userId = this.UtilisateurForm.value.id;
      const storedUser = this.storageService.getUtilisateur();

      if (userId === storedUser.id) {
        const idEntrepriseEnCours = this.UtilisateurForm.controls['idEntrepriseEnCours'].value;
        this.profileService.getSuperProfile(idEntrepriseEnCours).subscribe((dataProfile: any) => {
          this.UtilisateurForm.controls['profile'].setValue(dataProfile);
          this.updateSessionAndNavigation();
        });
      } else {
        this.router.navigate(['/Utilisateur']);
      }
    });
  }

  updateSessionAndNavigation() {
    window.sessionStorage.removeItem('utilisateur');
    const encodedValue = window.btoa(JSON.stringify(this.UtilisateurForm.value));
    window.sessionStorage.setItem('utilisateur', encodedValue);
    this.userService.user = this.UtilisateurForm.value;
    this.sessionService.updateSession(this.UtilisateurForm.value);
    this.router.navigate(['/Utilisateur']);
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
      this.UtilisateurForm.controls['image'].setValue(timestamp + file.name.substring(file.name.length - 4));
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



