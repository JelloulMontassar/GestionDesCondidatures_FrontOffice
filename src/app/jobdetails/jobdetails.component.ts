import { Component } from '@angular/core';
import { OffreService } from '../service/offre.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/login/auth.service';
import { StorageService } from '../auth/login/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jobdetails',
  templateUrl: './jobdetails.component.html',
  styleUrls: ['./jobdetails.component.scss']
})
export class JobDetailsComponent {
  job : any;
  jobId : any;
  imports: [
      CommonModule,
  ]
  constructor(private offreService : OffreService, 
              private route: ActivatedRoute,
              private  authService:AuthService,
              private  storageService :StorageService
  ) { }
    ngOnInit(): void {
        this.jobId = this.route.snapshot.paramMap.get('id');
        this.offreService.getOffre(this.jobId).subscribe((data) => {
            this.job = data;
        });
    }

    apply() {
        this.authService.getCandidat(this.storageService.getUser()["utilisateur"].id).subscribe((data) => {
            if (!data.cvPath) {
                Swal.fire({
                    title: 'Please upload your CV',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } else {
                this.offreService.apply(this.job, data).subscribe((data) => {
                    Swal.fire({
                        title: 'Application submitted successfully',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                });
            }
        })
        
    }
}
