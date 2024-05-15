import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DomaineService } from '../service/domaine.service';
import { catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceService } from '../service/language-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StorageService } from '../auth/login/storage.service';

@Component({
  selector: 'app-domaine',
  templateUrl: './domaine.component.html',
  styleUrls: ['./domaine.component.scss']
})
export class DomaineComponent {


  tableItem: any;
  deleteId:any;
  verifierList: boolean;
  privilege: any;
  selectedItem: any = 0;
  
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  constructor(private modalService: NgbModal ,private DomaineService: DomaineService, public router: Router ,  private translate: TranslateService ,  private languageService: LanguageServiceService , private storageService: StorageService) 
  {  this.languageService.language$.subscribe((lang) => {translate.use(lang);});
  this.privilege  = this.storageService.getUtilisateur().profile.listPrivileges.find(item => item.libelle === 'Domaine');

}
  ngOnInit() {
    this.loadData();
  }


  displayedColumns: string[] = ['select','logo','libelle', 'code', 'entreprise.libelle','action'];
  dataSource: any;


  loadData() {
    this.DomaineService.getData().pipe(
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
      // this.dataSource.filterPredicate = (data, filter) => {
      //   const dataStr =data.logo + data.libelle + data.code + data.entite + data.entreprise.libelle  ;
      //   return dataStr.indexOf(filter) != -1; 
      // }

    });
  }

  getProperty = (obj, path) => (
    path.split('.').reduce((o, p) => o && o[p], obj)
  )

  Filterchange(event: Event) {
    this.dataSource.filter = event.target;
  }

  // Filterchange(event: Event) { 
  //   const filvalue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filvalue;
  // }

  onSelect() {
    this.DomaineService.deleteDomaine(this.deleteId)
      .subscribe((data: any[]) => {
        this.loadData();
        this.modalService.dismissAll();
      });
  }

  addDomaine() {
    this.router.navigate(["/Domaine/addDomaine"]);
  }

  openDelete(targetModal, id: any) {
    this.deleteId  = id;

    let SelectDomaine = this.tableItem.find(SelectDomaine => SelectDomaine.id === this.deleteId);
    this.verifierList = false;
    if (SelectDomaine.listCentres.length !== 0 ) {
      this.verifierList = true;
    }



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


