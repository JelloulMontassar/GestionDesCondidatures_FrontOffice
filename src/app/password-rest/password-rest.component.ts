import { Component } from '@angular/core';
import { HashService } from '../service/hash.service';
import { StorageService } from '../auth/login/storage.service';
import * as bcrypt from 'bcryptjs';
import { UtilisateurService } from '../service/utilisateur.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/login/auth.service';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { LanguageServiceService } from '../service/language-service.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-password-rest',
  templateUrl: './password-rest.component.html',
  styleUrls: ['./password-rest.component.scss']
})
export class PasswordRestComponent {



  userForm = this.fb.group(
    {
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword : ['', [Validators.required]],
    });


    get oldPassword() {
      return this.userForm.get("oldPassword");
    }

    get newPassword() {
      return this.userForm.get("newPassword");
    }

    get confirmPassword() {
      return this.userForm.get("confirmPassword");
    }



  constructor(public router: Router,private hashService: HashService, private storageService: StorageService, private utilisateurService : UtilisateurService , private authService: AuthService, private fb: FormBuilder,  private languageService: LanguageServiceService , private translate: TranslateService) {
    this.languageService.language$.subscribe((lang) => { translate.use(lang); });
  }

  async resetPassword() {
    if (this.userForm.value.newPassword === this.userForm.value.confirmPassword ) {
      const inputOldPassword =this.userForm.value.oldPassword ;
      const storedUser = this.storageService.getUtilisateur();
      const storedPasswordHash = storedUser.passwd;

      const isPasswordCorrect = await this.comparePasswords(inputOldPassword, storedPasswordHash);

      if (isPasswordCorrect) {
        const newPasswordHash = await this.hashService.hash(this.userForm.value.newPassword);
       let user = this.storageService.getUtilisateur();
        user.passwd = newPasswordHash
        this.utilisateurService.modifierUtilisateur(user).subscribe((data: any[]) => {
          this.authService.logout().subscribe({
            next: res => {
              this.storageService.clean();
              this.router.navigateByUrl('auth/login');
            }
          });
        });
        }else {
          this.userForm.controls['oldPassword'].setErrors({ 'oldPasswordfalse': true });
        } 
    }else {
      this.userForm.controls['confirmPassword'].setErrors({ 'confirmPasswordfalse': true });
    }
  }

  async comparePasswords(inputPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, hashedPassword);
  }
}
