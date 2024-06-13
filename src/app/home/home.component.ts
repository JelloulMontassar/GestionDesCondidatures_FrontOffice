import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { Router } from "@angular/router";
import { OffreService } from '../service/offre.service';
import { CommonModule } from '@angular/common';

interface Job {
  img: string;
  title: string;
  location: string;
  type: string;
  salary: string;
  deadline: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  jobs= [];
  logggedIn = false;

  constructor(public router: Router, private offreService: OffreService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("auth-user")) {
      this.logggedIn = true;
    }
    this.offreService.getData().subscribe((data: any[]) => {
      this.jobs = data;
    });
  }

  onSearch(libelle: string, localisation: string, description: string) {
    this.searchOffres(libelle, localisation, description);
  }

  searchOffres(libelle?: string, localisation?: string, description?: string): void {
    this.offreService.searchOffres(libelle, localisation, description).subscribe(data => {
      this.jobs = data;
    });
  }

  showLoginSignupPrompt(jobId: number = 0) {
    if (!this.logggedIn) {
      Swal.fire({
        title: 'Welcome!',
        text: 'Do you want to login or sign up?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Login',
        cancelButtonText: 'Signup',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/auth/login']);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.router.navigate(['/SignUp']);
        }
      });
    } else {
      this.router.navigate(['/job-details/', jobId]);
    }
  }
}
