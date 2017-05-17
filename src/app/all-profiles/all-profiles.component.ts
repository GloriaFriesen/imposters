import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile.model';
import { ProfileService } from '../profile.service';
import { Post } from '../post.model';
import { FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { SearchProfilesPipe } from '../search-profiles.pipe';

@Component({
  selector: 'app-all-profiles',
  templateUrl: './all-profiles.component.html',
  styleUrls: ['./all-profiles.component.css']
})
export class AllProfilesComponent implements OnInit {
  users: FirebaseListObservable<any[]>;
  user: any = null;

  constructor(private router: Router, private profileService: ProfileService, private authService: AuthService) { }

  ngOnInit() {
    this.users = this.profileService.getProfiles();
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    })
  }

  goToDetailPage(clickedProfile) {
    this.router.navigate(['profiles', clickedProfile.$key]);
  }
}
