import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile.model';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  user: any = null;
  updateForm: FormGroup;
  Profile;

  constructor(private fb: FormBuilder, private authService: AuthService, private profileService: ProfileService, private router: Router) { }

  ngOnInit() {

    this.setupForm()

    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    })
  }

  update(){
    var {bio, location, jobStatus, specialty, portfolioSite, github, linkedIn} = this.updateForm.value;
    var newProfile = new Profile(bio, location, jobStatus, specialty, portfolioSite, github, linkedIn);
    console.log(this.user.uid);
    this.profileService.updateProfile(newProfile, this.user.uid)
  }

  setupForm(){
    this.updateForm = this.fb.group({
      bio: ['', Validators.required],
      location: ['', Validators.required],
      jobStatus: ['', Validators.required],
      specialty: ['', Validators.required],
      portfolioSite: ['', Validators.required],
      github: ['', Validators.required],
      linkedIn: ['', Validators.required],
    })
  }

}
