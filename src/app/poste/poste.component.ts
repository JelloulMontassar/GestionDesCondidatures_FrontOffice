import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../service/post.service';
import { catchError } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { LanguageServiceService } from '../service/language-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UtilisateurService } from '../service/utilisateur.service';
import { StorageService } from '../auth/login/storage.service';

@Component({
  selector: 'app-poste',
  templateUrl: './poste.component.html',
  styleUrls: ['./poste.component.scss']
})
export class PosteComponent {


  tableItem: any;
  deleteId:any;
  verifierList: boolean;
  privilege: any;
  selectedItem: any = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  constructor(private utilisateurService : UtilisateurService,private modalService: NgbModal ,private PostService: PostService, public router: Router  ,  private translate: TranslateService ,  private languageService: LanguageServiceService, private storageService: StorageService) 
  {  this.languageService.language$.subscribe((lang) => {translate.use(lang);});

  this.privilege  = this.storageService.getUtilisateur().profile.listPrivileges.find(item => item.libelle === 'Poste');

}
  ngOnInit() {
    this.loadData();
  }

  displayedColumns: string[] = ['select','libelle', 'departement.libelle', 'description', 'action'];
  dataSource: any;


  loadData() {
    this.PostService.getData().pipe(
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
    this.PostService.deletePoste(this.deleteId)
      .subscribe((data: any[]) => {
        this.loadData();
        this.modalService.dismissAll();
      });
  }

  addPoste() {
    this.router.navigate(["/Poste/addPoste"]);
  }


  openDelete(targetModal, id: any) {
    this.deleteId  = id;

    this.verifierList = false;
   

    this.utilisateurService.verifierPoste(this.deleteId)
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

