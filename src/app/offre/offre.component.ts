import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UtilisateurService } from '../service/utilisateur.service';
import { CandidatService } from '../service/candidat.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceService } from '../service/language-service.service';
import { StorageService } from '../auth/login/storage.service';
import { catchError } from 'rxjs';
import { OffreService } from '../service/offre.service';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.scss']
})
export class OffreComponent {


  tableItem: any;
  deleteId:any;
  verifierList: boolean;
  privilege: any;
  selectedItem: any = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  constructor(private utilisateurService : UtilisateurService,private modalService: NgbModal ,private OffreService: OffreService , public router: Router  ,  private translate: TranslateService ,  private languageService: LanguageServiceService, private storageService: StorageService) 
  {  this.languageService.language$.subscribe((lang) => {translate.use(lang);});

  this.privilege  = this.storageService.getUtilisateur().profile.listPrivileges.find(item => item.libelle === 'Offre');

}
  ngOnInit() {
    this.loadData();
  }

  displayedColumns: string[] = ['select', 'Libelle', 'Date Expiration',  'Localisation', 'Salaire','Type Contrat',  'Action'];
  dataSource: any;


  loadData() {
    this.OffreService.getData().pipe(
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
      this.dataSource.sortingDataAccessor = (obj, property) => this.getProperty(obj, property);
      this.translate.get('itemsPerPageLabel').subscribe((res: string) => {
        this.paginator._intl.itemsPerPageLabel = res;
      }); 
      this.dataSource.filterPredicate = (data, filter) => {
        const dataStr = data.libelle + data.departement.libelle + data.description  ;
        return dataStr.indexOf(filter) != -1; 
      }
    });
  }

  getProperty = (obj, path) => (
    path.split('.').reduce((o, p) => o && o[p], obj)
  )

  Filterchange(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

  onSelect() {
    this.OffreService.deleteOffre(this.deleteId)
      .subscribe((data: any[]) => {
        this.loadData();
        this.modalService.dismissAll();
      });
  }

  addOffre() {
    this.router.navigate(["/admin/Offre/addOffre"]);
  }


  openDelete(targetModal, id: any) {
    this.deleteId  = id;

    this.verifierList = false;
   

    this.utilisateurService.verifierOffre(this.deleteId)
    .subscribe((data: any[]) => {
     if(data){
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

