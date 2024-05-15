import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { EntrepriseService } from 'src/app/service/entreprise.service';
import { ModuleInstalleParEntrepriseService } from 'src/app/service/module-installe-par-entreprise.service';

@Component({
  selector: 'app-ajouter-module',
  templateUrl: './ajouter-module.component.html',
  styleUrls: ['./ajouter-module.component.scss']
})
export class AjouterModuleComponent {

  ModuleItem: any;
  EntrepriseItem: any;
  entrepriseSelect : any;

  ModuleForm = this.fb.group(
    {
      libelle: [
        "",
        [Validators.required],
        this.validateModuleNotTaken.bind(this)
      ],
      code: [0],
      active: ["false"],
      activeCRM: ["false"],
      entreprise : null
    });

  constructor(public router: Router, private moduleService: ModuleInstalleParEntrepriseService,private entrepriseService : EntrepriseService , private fb: FormBuilder) { }
  ngOnInit() { this.loadData(); }

  get libelle() {
    return this.ModuleForm.get("libelle");
  }



  loadData() {
    this.moduleService.getData().subscribe((data: any[]) => {
      this.ModuleItem = data;
    });

    this.entrepriseService.getData().subscribe((data: any[]) => {
      this.EntrepriseItem = data;
    });

  }


  ajouterModule() {
    let entreprise = this.EntrepriseItem.find( (item) => item.libelle === this.ModuleForm.value.entreprise);
    this.ModuleForm.value.entreprise = entreprise;


   this.moduleService.saveModule(this.ModuleForm.value).subscribe((data: any[]) => {
      this.router.navigate(["/Module"]);
    });   

  }

  checkModuleNotTaken(ModuleLibelle: string): Observable<boolean> {
    return of(this.ModuleItem).pipe(
      map((centreList: Array<any>) =>
        centreList.filter(Module => Module.libelle === ModuleLibelle)
      ),
      map(res => {
        return res.length === 0 ? true : false;
      })
    );
  }

  validateModuleNotTaken(control: AbstractControl) {
    return this.checkModuleNotTaken(control.value).pipe(
      map(res => {
        return res ? null : { ModuleTaken: true };
      })
    );
  }

}





