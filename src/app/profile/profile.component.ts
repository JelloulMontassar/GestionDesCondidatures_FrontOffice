import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../service/profile.service';
import { catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceService } from '../service/language-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UtilisateurService } from '../service/utilisateur.service';
import { StorageService } from '../auth/login/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  tableItem: any;
  deleteId: any;
  verifierList: boolean;
  privilege: any;
  SuperAdminPrivilege = false;
  ButtonModifier = false;
  selectedItem: any = 0;
  SuperAdminSuivrePrivilege = false;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  displayedColumns: string[] = ['select','libelle', 'action'];
  dataSource: any;


  constructor(private utilisateurService: UtilisateurService, private modalService: NgbModal, private profileService: ProfileService, public router: Router, private translate: TranslateService, private languageService: LanguageServiceService, private storageService: StorageService) {
    this.languageService.language$.subscribe((lang) => { translate.use(lang); });
    this.privilege = this.storageService.getUtilisateur().profile.listPrivileges.find(item => item.libelle === 'Profile');
    this.SuperAdminSuivrePrivilege=this.storageService.getUtilisateur().suivre;

    if (this.storageService.getUtilisateur().profile.id === 1 || this.storageService.getUtilisateur().profile.id === 2091) {
      this.SuperAdminPrivilege = true;
    }



  }
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.profileService.getData().pipe(
      catchError((error) => {
        if (error.status === 401) {
          window.sessionStorage.clear();
          window.location.reload();

        }
        return error;
      })
    ).subscribe((data: any[]) => {
      this.tableItem = data;
      this.dataSource = new MatTableDataSource<any>(data)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.translate.get('itemsPerPageLabel').subscribe((res: string) => {
        this.paginator._intl.itemsPerPageLabel = res;
      });
    });
  }
  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }
  onSelect() {
    this.profileService.deleteProfile(this.deleteId)
      .subscribe((data: any[]) => {
        this.loadData();
        this.modalService.dismissAll();
      });
  }

  addProfile() {
    this.router.navigate(["/admin/Profile/addProfile"]);
  }
  openDelete(targetModal, id: any) {
    this.deleteId = id;

/*     let Profile = this.tableItem.find(profile => profile.id === this.deleteId);
    this.verifierList = false;
    if (Profile.listPrivileges.length !== 0 && Profile.listPrivileges.some(privilege => privilege.supression === false)) {
      this.verifierList = true;
    } */

    this.utilisateurService.verifierProfile(this.deleteId)
      .subscribe((data: any[]) => {
        if (data) {
          this.verifierList = true;
        }
      });


    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg',
      centered: true
    });
  }


  onRadioChange(element: any) {
    this.selectedItem = element;    
  }

  
}
