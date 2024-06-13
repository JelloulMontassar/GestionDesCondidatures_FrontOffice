import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/login/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-step-two',
  templateUrl: './signup-step-two.component.html',
  styleUrls: ['./signup-step-two.component.scss']
})
export class SignupStepTwoComponent implements OnInit {
  candidateForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.candidateForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      dateNaissance: ['', Validators.required]
    });
  }

  signupData = this.authService.getSignupData();

  ngOnInit() {
    if (!this.authService.getSignupData()) {
      this.router.navigate(['/SignUp']);
    }
  }

  onSubmit() {
    if (this.candidateForm.valid) {
      const candidateData = this.candidateForm.value;
      this.authService.register(this.signupData.username, this.signupData.email, this.signupData.password, candidateData).subscribe({
        next: data => {
          Swal.fire({
            title: 'Success',
            text: 'You have successfully registered!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.router.navigate(['/auth/login']);
          });
        },
        error: error => {
          Swal.fire({
            title: 'Error',
            text: 'There was an error during registration. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error(error);
        }
      });
    }
  }
}
