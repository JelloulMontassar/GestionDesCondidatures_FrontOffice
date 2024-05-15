import { Component, ViewChild } from '@angular/core';
import { TypeUsagerService } from '../service/type-usager.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { StorageService } from '../auth/login/storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceService } from '../service/language-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { catchError } from 'rxjs';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-type-usager',
  templateUrl: './type-usager.component.html',
  styleUrls: ['./type-usager.component.scss']
})
export class TypeUsagerComponent {
  tableItem: any;
  deleteId: any;
  verifierList: boolean =false;
  privilege: any;
  selectedItem: any = 0;
  CycleParamItem: any


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

/**
 *
 */
constructor(
  private typeUsagerService: TypeUsagerService ,
  public router: Router,
  private modalService: NgbModal, 
  private translate: TranslateService, 
  private languageService: LanguageServiceService ,
  private storageService: StorageService,

) { 
  this.languageService.language$.subscribe((lang) => { translate.use(lang); });
  this.privilege  = this.storageService.getUtilisateur().profile.listPrivileges.find(item => item.libelle === 'TypeUsage');

}


displayedColumns: string[] = ['select',  'libelle','libelleCategorieTypeUsager','poidIdeal','nombreJourCycle','action'];
  dataSource: any;

  ngOnInit(): void {
    this.loadData();
    
  }

  loadData() {
    this.typeUsagerService.getData().pipe(    
      catchError((error) => {
        if (error.status === 401) {
          window.sessionStorage.clear();
          window.location.reload();

        }
        return error;
      })
    ).subscribe((data: any[]) => {
      this.tableItem = data;
      console.log(data)
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
  openRecherche(targetModal) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg',
      centered: true
    });
  }

  addTypeUsager() {
    this.router.navigate(["/TypeUsage/addTypeUsager"]);
  }

  onRadioChange(element: any) {
    this.selectedItem = element;    
  }

  openDelete(targetModal, id: any) {
    this.deleteId = id;
    this.verifierList = false;
  
   
      const item = this.CycleParamItem.find(item => item.idTypeUsager === this.deleteId && item.supression === false);
  
      if (item) {
        this.verifierList = true;
      } else {
        this.verifierList = false;
      }
    
  
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg',
      centered: true
    });
  
    console.log('verifierList:', this.verifierList);
  }
  

  onSelect() {
    this.typeUsagerService.updateSuppression(this.deleteId).subscribe( (data: any[]) => {
      console.log('Mise à jour de la suppression réussie.', data);
      this.loadData();
      this.modalService.dismissAll();
    },
    (error) => {
      console.error('Erreur lors de la mise à jour de la suppression.', error);
    }
  );
  }

}
