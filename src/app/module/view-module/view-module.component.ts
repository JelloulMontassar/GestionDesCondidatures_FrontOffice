import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModuleInstalleParEntrepriseService } from 'src/app/service/module-installe-par-entreprise.service';

@Component({
  selector: 'app-view-module',
  templateUrl: './view-module.component.html',
  styleUrls: ['./view-module.component.scss']
})
export class ViewModuleComponent {

  id!: number;
  ModuleItem: any;


  constructor(private route: ActivatedRoute, private ModuleService: ModuleInstalleParEntrepriseService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.onSelect(this.id);



  }


  onSelect(idModule: any) {
    this.ModuleService.getModule(idModule).subscribe((data: any[]) => {
      this.ModuleItem = data;


    });
  }

}

