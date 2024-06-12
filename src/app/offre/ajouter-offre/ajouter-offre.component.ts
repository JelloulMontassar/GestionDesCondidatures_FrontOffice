import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';
import { DepartementService } from 'src/app/service/departement.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';
import { OffreService } from 'src/app/service/offre.service';

@Component({
    selector: 'app-ajouter-offre',
    templateUrl: './ajouter-offre.component.html',
    styleUrls: ['./ajouter-offre.component.scss']
})
export class AjouterOffreComponent {

    OffreItem: any;
    DepartementItem: any;

    OffreForm = this.fb.group({
        libelle: ['', [Validators.required]],
        dateExpiration: ['', [Validators.required]],
        description: ['---'],
        departement: [null, [Validators.required]],
        supression: [0],
        idEntreprise: this.storageService.getUtilisateur().idEntrepriseEnCours,
        libelleEntreprise: this.storageService.getUtilisateur().libelleEntrepriseEnCours,
        localisation: ['', [Validators.required]],
        salaire: ['', [Validators.required]],
        requirements: ['', [Validators.required]],
        type: ['', [Validators.required]],
        benefices: ['', [Validators.required]]
    });

    constructor(private storageService: StorageService, public router: Router, private DepartementService: DepartementService, private OffreService: OffreService, private fb: FormBuilder, private translate: TranslateService, private languageService: LanguageServiceService) {
        this.languageService.language$.subscribe((lang) => { translate.use(lang); });
    }

    ngOnInit() {
        this.loadData();
    }

    get libelle() {
        return this.OffreForm.get("libelle");
    }

    get departement() {
        return this.OffreForm.get("departement");
    }

    loadData() {
        this.DepartementService.getData().subscribe((data: any[]) => {
            this.DepartementItem = data;
        });

        this.OffreService.getData().subscribe((data: any[]) => {
            this.OffreItem = data;
        });
    }

    ajouterOffre() {
        let Departement = this.DepartementItem.find((item) => item.libelle === this.OffreForm.value.departement);
        this.OffreForm.value.departement = Departement;
        this.OffreService.verifierLibelle(this.OffreForm.value.libelle).subscribe((data: boolean) => {
            if (data == true) {
                this.OffreForm.controls['libelle'].setErrors({ 'posteTaken': true });
            } else {
                this.OffreService.saveOffre(this.OffreForm.value).subscribe((data: any[]) => {
                    this.router.navigate(["/admin/Offre"]);
                });
            }
        });
    }
}
