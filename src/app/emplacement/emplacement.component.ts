import { Component, ViewChild } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceService } from '../service/language-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmplacementService } from '../service/emplacement.service';
import { StorageService } from '../auth/login/storage.service';


@Component({
  selector: 'app-emplacement',
  templateUrl: './emplacement.component.html',
  styleUrls: ['./emplacement.component.scss']
})
export class EmplacementComponent {

  tableItem: any;
  deleteId:any;
  verifierList: boolean;
  privilege: any;
  selectedItem: any = 0;


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private modalService: NgbModal ,private emplacementService : EmplacementService, public router: Router ,  private translate: TranslateService ,  private languageService: LanguageServiceService , private storageService: StorageService) 
  {  this.languageService.language$.subscribe((lang) => {translate.use(lang);});
  this.privilege  = this.storageService.getUtilisateur().profile.listPrivileges.find(item => item.libelle === 'Emplacement');

}
  ngOnInit() {
    this.loadData();
  }


  displayedColumns: string[] = ['select','libelle', 'dateCreation', 'description','action'];
  dataSource: any;


  loadData() {
    this.emplacementService.getData().pipe(
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
    this.emplacementService.deleteEmplacement(this.deleteId)
      .subscribe((data: any[]) => {
        this.loadData();
        this.modalService.dismissAll();
      });
  }


  addEmplacement() {
    this.router.navigate(["/Emplacement/addEmplacement"]);
  }


  openDelete(targetModal, id: any) {
    this.deleteId  = id;

    this.deleteId = id;
    let SelectEmplacement = this.tableItem.find(SelectEmplacement => SelectEmplacement.id === this.deleteId);
    this.verifierList = false;
    this.emplacementService.verifierDetail(SelectEmplacement.libelle).subscribe((data: any[]) => {
      if (data) {
        this.verifierList = true
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
