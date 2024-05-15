import { Component, ViewChild ,OnInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { StorageService } from '../auth/login/storage.service'
import { LanguageServiceService } from '../service/language-service.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {CategorieArticleService} from '../service/categorie-article.service'
import { catchError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-categorie-article',
  templateUrl: './categorie-article.component.html',
  styleUrls: ['./categorie-article.component.scss']
})
export class CategorieArticleComponent implements OnInit {
  
  tableItem: any;
  deleteId: any;
  verifierList: boolean;
  privilege: any;
  selectedItem: any = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  displayedColumns: string[] = ['select', 'libelle', 'description','action'];
  dataSource: any;

  constructor(
    public router: Router,
    private modalService: NgbModal, 
    private translate: TranslateService, 
    private languageService: LanguageServiceService ,
    private storageService: StorageService,
    private categoriearticleService :CategorieArticleService
  ) { 

    this.languageService.language$.subscribe((lang) => { translate.use(lang); });
    this.privilege  = this.storageService.getUtilisateur().profile.listPrivileges.find(item => item.libelle === 'CategorieArticle');
  
  }

  ngOnInit(): void {

    this.loadData();

  }

  loadData() {
    this.categoriearticleService.getData().pipe(    
      catchError((error) => {
        if (error.status === 401) {
          window.sessionStorage.clear();
          window.location.reload();

        }
        return error;
      })
    ).subscribe((data: any[]) => {
      this.tableItem = data;
      console.log("categorie article"+JSON.stringify(data))
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

  addCategorieArticle() {
    this.router.navigate(["/CategorieArticle/addCategorieArticle"]);
  }

  onRadioChange(element: any) {
    this.selectedItem = element;    
  }
  
  openDelete(targetModal, id: any) {

    this.deleteId = id;
    let CategorieArticle = this.tableItem.find(categorieArticle => categorieArticle.id === this.deleteId);
    this.verifierList = false;
    if (CategorieArticle.listArticle.length !== 0 && CategorieArticle.listArticle.some(article => article.supression === false)) {
      this.verifierList = true;
    }
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg',
      centered: true
    });
  }

  onSelect() {
    this.categoriearticleService.updateSuppression(this.deleteId).subscribe( (data: any[]) => {
      
      this.loadData();
      this.modalService.dismissAll();
    
    }
  );
  }
 

}
