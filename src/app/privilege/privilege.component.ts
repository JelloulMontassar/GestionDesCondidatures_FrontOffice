import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PrivilegeService } from '../service/privilege.service';
import { catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceService } from '../service/language-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.scss']
})
export class PrivilegeComponent {

  tableItem: any;
  deleteId:any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  constructor(private modalService: NgbModal ,private privilegeService: PrivilegeService, public router: Router  ,  private translate: TranslateService ,  private languageService: LanguageServiceService) 
  {  this.languageService.language$.subscribe((lang) => {translate.use(lang);});}
  ngOnInit() {
    this.loadData();
  }


  displayedColumns: string[] = ['libelle', 'order', 'moduleActiver', 'activation','profile.libelle','action'];
  dataSource: any;


  loadData() {
    this.privilegeService.getData().pipe(
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
        const dataStr = data.libelle + data.order + data.moduleActiver + data.activation + data.profile.libelle  ;
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
    this.privilegeService.deletePrivilege(this.deleteId)
      .subscribe((data: any[]) => {
        this.loadData();
        this.modalService.dismissAll();
      });
  }

  addPrivilege() {
    this.router.navigate(["/Privilege/addPrivilege"]);
  }

  openDelete(targetModal, id: any) {
    this.deleteId  = id;
     this.modalService.open(targetModal, {
       backdrop: 'static',
       size: 'lg',
       centered: true
     });
   }




}


