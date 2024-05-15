import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntrepriseService } from 'src/app/service/entreprise.service';
import { ModuleInstalleParEntrepriseService } from 'src/app/service/module-installe-par-entreprise.service';

@Component({
  selector: 'app-modifier-module',
  templateUrl: './modifier-module.component.html',
  styleUrls: ['./modifier-module.component.scss']
})
export class ModifierModuleComponent {

   
  id: number;
  ModuleItem: any;
  EntrepriseItem: any;
  EntrepriseSelect : any;
  
  
  ModuleForm = this.fb.group(
    {
      id :[0],
      libelle: [""],
      code: [0],
      active: ["false"],
      activeCRM: ["false"],
      entreprise : null
    });


  

  constructor(public router: Router ,private routeActivate: ActivatedRoute, private entrepriseService : EntrepriseService , private moduleService : ModuleInstalleParEntrepriseService, private fb: FormBuilder){}

  ngOnInit() {
    this.id = +this.routeActivate.snapshot.paramMap.get('id');
    this.onSelect(this.id);
    this.loadData();
    
    
    
  }
  onSelect(idModule: any){
    this.moduleService.getModule(idModule).subscribe((data: any[]) => {
      this.ModuleItem = data;
      this.EntrepriseSelect = this.ModuleItem.entreprise
      this.ModuleForm.setValue({id : this.ModuleItem.id , libelle :this.ModuleItem.libelle,code : this.ModuleItem.code,active :this.ModuleItem.active.toString(),entreprise : this.ModuleItem.entreprise.libelle , activeCRM : "false"})
    });
  }

  onEntrepriseChange(entreprise: string){
    const selectedentreprise = this.EntrepriseItem.find(
      (item) => item.libelle === entreprise);
      this.ModuleItem.entreprise = selectedentreprise.libelle;
      this.EntrepriseSelect = selectedentreprise
   }

   loadData() {
    this.entrepriseService.getData().subscribe((data: any[]) => {
      this.EntrepriseItem = data;
     
    });
  }


  modifierModule(){
    this.ModuleForm.value.entreprise = this.EntrepriseSelect;

    this.moduleService.modifierModule(this.ModuleForm.value).subscribe((data: any[]) => {
      this.router.navigate(["/Module"]);
    }); 
  } 
}



