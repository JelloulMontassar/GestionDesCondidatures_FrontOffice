import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

import { AuthService } from "src/app/auth/login/auth.service";
import { StorageService } from "src/app/auth/login/storage.service";
import { LanguageServiceService } from "src/app/service/language-service.service";
import { UserNavBarService } from "src/app/service/user-nav-bar.service";

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.scss"],
})
export class MyAccountComponent implements OnInit {
  public userName: string;
  public profileImg: "assets/images/dashboard/profile.jpg";
  @Input() user: any;




  constructor(public router: Router, private storageService: StorageService, private authService: AuthService  ,  private translate: TranslateService ,  private languageService: LanguageServiceService , private userService : UserNavBarService) {
    this.languageService.language$.subscribe((lang) => {translate.use(lang);});

  }

  ngOnInit() {
    this.userService.userObservable.subscribe((user) => { this.user = this.storageService.getUtilisateur(); });
  }

  logoutFunc() {
    this.authService.logout().subscribe({
      next: res => {
        this.storageService.clean();
        this.router.navigateByUrl('auth/login');
      }
    });

  }
}
