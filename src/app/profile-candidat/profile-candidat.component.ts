import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/login/auth.service';
import { HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidat',
  templateUrl: './profile-candidat.component.html',
  styleUrls: ['./profile-candidat.component.scss']
})
export class ProfileCandidatComponent implements OnInit {
  candidateForm: FormGroup;
  candidateId: number;
  selectedFile: File | null = null;
  uploadProgress: number = -1;
  cvPath: string | null = null;

  constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authService: AuthService
  ) {
    this.candidateForm = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],

      adresse: ['', Validators.required],
      dateNaissance: ['', Validators.required]
    });
  }
  formatDateToYYYYMMDD(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  ngOnInit(): void {
    this.candidateId = +this.route.snapshot.params['id'];
    this.authService.getCandidat(this.candidateId).subscribe(data => {
      data.dateNaissance = this.formatDateToYYYYMMDD(data.dateNaissance);
      this.candidateForm.patchValue(data);
      this.cvPath = data.cvPath;
    }, error => {
      console.error(error);
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.candidateForm.valid) {
      const updatedCandidate = this.candidateForm.value;
      this.authService.updateCandidat(this.candidateId, updatedCandidate).subscribe({
        next: data => {
          Swal.fire({
            icon: 'success',
            title: 'Candidate updated successfully',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/user/candidat/', this.candidateId]);
        },
        error: error => {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Update failed',
            text: 'There was an error updating the candidate information.',
          });
        }
      });
    }
  }

  onCvUpload(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('id', this.candidateId.toString());
      this.authService.uploadCV(formData).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * event.loaded / event.total!);
        } else if (event.type === HttpEventType.Response) {
          Swal.fire({
            icon: 'success',
            title: 'CV uploaded successfully',
            showConfirmButton: false,
            timer: 1500
          });
          this.cvPath = event.body.cvPath;
          this.uploadProgress = -1;
        }
      }, error => {
        console.error('CV upload failed', error);
        Swal.fire({
          icon: 'error',
          title: 'Upload failed',
          text: 'There was an error uploading the CV.',
        });
        this.uploadProgress = -1;
      });
    }
  }
}
