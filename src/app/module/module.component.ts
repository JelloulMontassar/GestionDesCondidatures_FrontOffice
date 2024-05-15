import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModuleInstalleParEntrepriseService } from '../service/module-installe-par-entreprise.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent {

  tableItem: any;

  constructor(private mduleInstalleParEntrepriseService: ModuleInstalleParEntrepriseService, public router: Router) {
  }
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.mduleInstalleParEntrepriseService.getData().pipe(
      catchError((error) => {
        if (error.status === 401) {
          window.sessionStorage.clear();
          window.location.reload();

        }
        return error;
      })
    ).subscribe((data: any[]) => {
      this.tableItem = data;
    });
  }

  onSelect(idModule: any) {
    this.mduleInstalleParEntrepriseService.deleteModule(idModule)
      .subscribe((data: any[]) => {
        this.loadData();
      });
  }

  addModule() {
    this.router.navigate(["/Module/addModule"]);
  }

}

