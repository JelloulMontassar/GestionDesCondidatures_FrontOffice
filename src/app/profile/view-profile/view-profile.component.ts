import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/auth/login/storage.service';
import { LanguageServiceService } from 'src/app/service/language-service.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent {

  id!: number;
  ProfileItem: any;
  privilege: any;

  constructor(private route: ActivatedRoute, private ProfileService : ProfileService ,  private translate: TranslateService ,  private languageService: LanguageServiceService , private storageService: StorageService) 
  {  this.languageService.language$.subscribe((lang) => {translate.use(lang);});
  this.privilege  = this.storageService.getUtilisateur().profile.listPrivileges.find(item => item.libelle === 'Profile');

}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.onSelect(this.id); 
  }


  onSelect(idProfile: any){
    this.ProfileService.getProfile(idProfile).subscribe((data: any[]) => {
      this.ProfileItem = data;

    
    });
  }

}

