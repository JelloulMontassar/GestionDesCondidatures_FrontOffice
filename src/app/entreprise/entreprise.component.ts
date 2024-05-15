import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EntrepriseService } from '../service/entreprise.service';
import { catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceService } from '../service/language-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StorageService } from '../auth/login/storage.service';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.scss']
})
export class EntrepriseComponent {

  tableItem: any;
  deleteId: any;
  verifierList: boolean;
  privilege: any;
  selectedItem: any = 0;
  suivre :any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  constructor(private modalService: NgbModal, private entrepriseService: EntrepriseService, public router: Router, private translate: TranslateService, private languageService: LanguageServiceService , private storageService: StorageService) { this.languageService.language$.subscribe((lang) => { translate.use(lang); });
  this.privilege  = this.storageService.getUtilisateur().profile.listPrivileges.find(item => item.libelle === 'Entreprise');
  this.suivre = this.storageService.getUtilisateur().suivre;
}
  ngOnInit() {
    this.loadData();
  }


  displayedColumns: string[] = ['select','photo','libelle', 'matriculeFiscale', 'representantLegal', 'dateCreation', 'action'];
  dataSource: any;


  loadData() {
   
    this.entrepriseService.getData().pipe(
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
    this.entrepriseService.deleteEntreprise(this.deleteId)
      .subscribe((data: any[]) => {
        this.loadData();
        this.modalService.dismissAll();
      });
  }

  addEntreprise() {
    this.router.navigate(["/Entreprise/addEntreprise"]);
  }


  openDelete(targetModal, id: any) {
    this.deleteId = id;

    let Entreprise = this.tableItem.find(entreprise => entreprise.id === this.deleteId);
    this.verifierList = false;
    if (Entreprise.listDomaines.length !== 0 && Entreprise.listDomaines.some(domaine => domaine.supression === false)) {
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

