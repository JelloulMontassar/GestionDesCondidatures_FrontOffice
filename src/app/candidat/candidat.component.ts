import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceService } from '../service/language-service.service';
import { StorageService } from '../auth/login/storage.service';
import { catchError } from 'rxjs';
import {CandidatService} from '../service/candidat.service'
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.scss']
})
export class CandidatComponent  implements OnInit{

  tableItem: any;
  deleteId: any;
  verifierList: boolean=false;
  privilege: any;
  selectedItem: any = 0;
  CycleParamItem: any

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

/**
 *
 */
constructor(
  private candidatService: CandidatService ,
  public router: Router,
  private modalService: NgbModal, 
  private translate: TranslateService, 
  private languageService: LanguageServiceService ,
  private storageService: StorageService,
) { 
  this.languageService.language$.subscribe((lang) => { translate.use(lang); });
  this.privilege  = this.storageService.getUtilisateur().profile.listPrivileges.find(item => item.libelle === 'Candidat');

}


displayedColumns: string[] = ['select','nom', 'prenom','dateNaissance','gsm','cin','dateCreation','action'];
  dataSource: any;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.candidatService.getData().pipe(    
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
  openRecherche(targetModal) {
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg',
      centered: true
    });
  }

  addCandidat() {
    this.router.navigate(["/admin/Candidat/addCandidat"]);
  }

  onRadioChange(element: any) {
    this.selectedItem = element;    
  }
  
  openDelete(targetModal, id: any) {
    this.deleteId = id;
    this.verifierList = false;
  
    if (this.CycleParamItem) {
      for (const cycleParamItem of this.CycleParamItem) {
        if (cycleParamItem.ListDetailCycleParam) {
          const detailCycleParam = cycleParamItem.ListDetailCycleParam.find(detail => detail.idCandidat === this.deleteId);
  
          if (detailCycleParam) {
            this.verifierList = !cycleParamItem.ListDetailCycleParam.some(detail =>
              detail.supression === false && detail.idCandidat === this.deleteId
            );
            this.verifierList=true;
            break; 
          }
        }
      }
    }
  
    
  
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg',
      centered: true
    });
  }
    
  
  onSelect() {
    this.candidatService.updateSuppression(this.deleteId).subscribe( (data: any[]) => {
      
      this.loadData();
      this.modalService.dismissAll();
    
    }
  );
  }

}
