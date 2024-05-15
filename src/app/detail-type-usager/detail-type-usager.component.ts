import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceService } from '../service/language-service.service';
import { StorageService } from '../auth/login/storage.service';
import {DetailTypeUsagerService} from '../service/detail-type-usager.service'
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-detail-type-usager',
  templateUrl: './detail-type-usager.component.html',
  styleUrls: ['./detail-type-usager.component.scss']
})
export class DetailTypeUsagerComponent {

  tableItem: any;
  deleteId: any;
  verifierList: boolean;
  privilege: any;
  selectedItem: any = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private detailtypeUsagerService: DetailTypeUsagerService ,
    public router: Router,
    private modalService: NgbModal, 
    private translate: TranslateService, 
    private languageService: LanguageServiceService ,
    private storageService: StorageService,
  ) { 
    this.languageService.language$.subscribe((lang) => { translate.use(lang); });
    this.privilege  = this.storageService.getUtilisateur().profile.listPrivileges.find(item => item.libelle === 'TypeUsage');
  
  }
  
  
  //displayedColumns: string[] = ['select', 'code', 'libelle', 'description','poidIdeal','nombreJourCycle','action'];
  displayedColumns: string[] = ['select','libelle','description','action'];
  
  dataSource: any;
  
    ngOnInit(): void {
      this.loadData();
    }
  
    loadData() {
      this.detailtypeUsagerService.getData().pipe(    
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
  
    addCategorieTypeUsage() {
      this.router.navigate(["/CategorieUsage/addCategorieTypeUsager"]);
    }
  
    onRadioChange(element: any) {
      this.selectedItem = element;    
    }
  
    openDelete(targetModal, id: any) {

      this.deleteId = id;
      let DetailTypeUsager = this.tableItem.find(detailTypeUsager => detailTypeUsager.id === this.deleteId);
      this.verifierList = false;
      if (DetailTypeUsager.listTypeUsager.length !== 0 && DetailTypeUsager.listTypeUsager.some(typeUsager => typeUsager.supression === false)) {
        this.verifierList = true;
      }
      
  
      this.modalService.open(targetModal, {
        backdrop: 'static',
        size: 'lg',
        centered: true
      });
  
  
    }
    onSelect() {
      this.detailtypeUsagerService.updateSuppression(this.deleteId).subscribe( (data: any[]) => {
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
