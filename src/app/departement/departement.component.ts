import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DepartementService } from '../service/departement.service';
import { catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceService } from '../service/language-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StorageService } from '../auth/login/storage.service';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent {


  tableItem: any;
  deleteId:any;
  verifierList: boolean;
  privilege: any;
  selectedItem: any = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  constructor(private modalService: NgbModal ,private departementService: DepartementService, public router: Router ,  private translate: TranslateService ,  private languageService: LanguageServiceService, private storageService: StorageService) 
  {  this.languageService.language$.subscribe((lang) => {translate.use(lang);});
  this.privilege  = this.storageService.getUtilisateur().profile.listPrivileges.find(item => item.libelle === 'Departement');

}
  ngOnInit() {
    this.loadData();
  }


  displayedColumns: string[] = ['select','libelle', 'description', 'action'];
  dataSource: any;

  loadData() {
    this.departementService.getData().pipe(
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
    this.departementService.deleteDepartement(this.deleteId)
      .subscribe((data: any[]) => {
        this.loadData();
        this.modalService.dismissAll();
      });
  }

  addDepartement() {
    this.router.navigate(["/admin/Departement/addDepartement"]);
  }

  openDelete(targetModal, id: any) {
    this.deleteId  = id;
    let Departement = this.tableItem.find(departement => departement.id === this.deleteId);
    this.verifierList = false;
    if (Departement.listPostes.length !== 0  && Departement.listPostes.some(poste => poste.supression === false)) {
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

