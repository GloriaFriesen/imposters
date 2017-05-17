import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FirebaseListObservable } from 'angularfire2/database';
import { Profile } from '../profile.model';
import { ProfileService } from '../profile.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  profileId: string;
  profileToDisplay;
  user: any = null;

  constructor(private route: ActivatedRoute, private location: Location, private profileService: ProfileService, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.profileId = urlParameters['id'];
    });
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
    this.profileService.getUserById(this.profileId).subscribe(profileToDisplay => {
      this.profileToDisplay = profileToDisplay;
    });
  }

}
