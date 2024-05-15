import { Component , ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { catchError } from 'rxjs';
import { LanguageServiceService } from '../service/language-service.service';
import { ProfileService } from '../service/profile.service';
import { UtilisateurService } from '../service/utilisateur.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StorageService } from '../auth/login/storage.service';
import { FormBuilder } from '@angular/forms';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent {

  tableItem: any;
  deleteId:any;
  privilege: any;
  idUtilisateur = this.storageService.getUtilisateur().id;
  SuperAdminPrivilege = false;
  selectedItem: any = 0;
  profileItem: any;
  posteItem: any;


  dateForm = this.fb.group({
    profileId: [null],
    posteId: [null],
    email : [null],
    statut :[null],
  });





  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;



  constructor(private fb: FormBuilder,private modalService: NgbModal , private utilisateurService : UtilisateurService, private profileService : ProfileService ,public router: Router  ,  private translate: TranslateService ,  private languageService: LanguageServiceService , private storageService: StorageService ,private PostService: PostService) 
  {  this.languageService.language$.subscribe((lang) => {translate.use(lang);});


  
  this.privilege  = this.storageService.getUtilisateur().profile.listPrivileges.find(item => item.libelle === 'Utilisateur');
  if (this.storageService.getUtilisateur().profile.libelle === "Super Admin" ) {
   //this.storageService.getUtilisateur().profile.id === 1 || this.storageService.getUtilisateur().profile.id === 2091
    this.SuperAdminPrivilege = true;
  }



}
  ngOnInit() {
    this.loadData("0","0","0","0");
    this.profileService.getData().subscribe((data: any[]) => { 
      this.profileItem = data;
    }); 

    this.PostService.getData().subscribe((data: any[]) => { 
      this.posteItem = data;
    }); 

  }


  displayedColumns: string[] = ['select','photo','nom', 'prenom', 'dateNaissance',  'poste.libelle', 'profile.libelle','action'];
  dataSource: any;


  loadData(profileId , posteId , email , statut ) {

    this.utilisateurService.rechercheUtilisateurs(
      profileId,posteId,email,statut
    ).pipe(
      catchError((error) => {
        if (error.status === 401) {
          window.sessionStorage.clear();
          window.location.reload();
        }
        return error;
      })
    ).subscribe((data: any[]) => {
      if (this.storageService.getUtilisateur().suivre === true) {
        this.tableItem = data;
      } else {
        data = data.filter(user => user.suivre !== true);
        this.tableItem = data;
      }      
      this.dataSource = new MatTableDataSource<any>(data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (obj, property) => this.getProperty(obj, property);
      this.translate.get('itemsPerPageLabel').subscribe((res: string) => {
        this.paginator._intl.itemsPerPageLabel = res;
      }); 
      // this.dataSource.filterPredicate = (data, filter) => {
      //   const dataStr = data.nom + data.prenom + data.dateNaissance + data.poste.libelle + data.profile.libelle  ;
      //   return dataStr.indexOf(filter) != -1; 
      // }
    });
  }


  getProperty = (obj, path) => (
    path.split('.').reduce((o, p) => o && o[p], obj)
  )

  

  onSelect() {
    this.utilisateurService.deleteUtilisateur(this.deleteId)
      .subscribe((data: any[]) => {
        this.loadData("0","0","0","0");
        this.modalService.dismissAll();
      });
  }

  
  addUtilisateur() {
    this.router.navigate(["/Utilisateur/addUtilisateur"]);
  }
  openDelete(targetModal, id: any) {
    this.deleteId  = id;
     this.modalService.open(targetModal, {
       backdrop: 'static',
       size: 'lg',
       centered: true
     });
   }



   onRadioChange(element: any) {
    this.selectedItem = element;    
  }




  openRecherche(targetModal) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg',
      centered: true
    });
  }

  recherche() {
if (this.dateForm.value.profileId == null) {
  this.dateForm.controls['profileId'].setValue("0");
}

if (this.dateForm.value.posteId == null) {
  this.dateForm.controls['posteId'].setValue("0");
}

if (this.dateForm.value.email == null) {
  this.dateForm.controls['email'].setValue("0");
}

if (this.dateForm.value.statut == null) {
  this.dateForm.controls['statut'].setValue("0");
}
    this.loadData(this.dateForm.value.profileId,this.dateForm.value.posteId,this.dateForm.value.email,this.dateForm.value.statut );
    this.dateForm.reset();
    this.modalService.dismissAll();
  }

  Filterchange(event: Event) { 
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }



}


