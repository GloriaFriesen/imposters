import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FirebaseListObservable } from 'angularfire2/database';
import { Profile } from '../profile.model';
import { ProfileService } from '../profile.service';
import { AuthService } from '../auth.service';
import { MaterializeAction } from 'angular2-materialize';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  profileId: string;
  profileToDisplay;
  user: any = null;
  editProfileForm: FormGroup;
  editClicked: any = null;
  ownerMode: any = null;
  warnAction = new EventEmitter;
  Materialize:any;


  constructor(private fb: FormBuilder, private route: ActivatedRoute, private location: Location, private profileService: ProfileService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.profileId = urlParameters['id'];
    });
    this.setupForm()
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user; this.checkOwner();
    });
    this.profileService.getUserById(this.profileId).subscribe(profileToDisplay => {
      this.profileToDisplay = profileToDisplay;
    });
  }

  setupForm(){
    this.editProfileForm = this.fb.group({
      bio: ['', Validators.required],
      location: ['', Validators.required],
      jobStatus: ['', Validators.required],
      specialty: ['', Validators.required],
      portfolioSite: ['', Validators.required],
      github: ['', Validators.required],
      linkedIn: ['', Validators.required],
    })
  }
  showEdit(){
    if(this.editClicked === null){
      this.editClicked = true;
      this.setupForm();
      this.setForm(this.profileToDisplay.bio, this.profileToDisplay.location, this.profileToDisplay.jobStatus, this.profileToDisplay.specialty, this.profileToDisplay.portfolioSite, this.profileToDisplay.github, this.profileToDisplay.linkedIn);
    } else {
      this.editClicked = null;
    }
  }
  setForm(bio: string, location: string, jobStatus: string, specialty: string, portfolioSite: string, github: string, linkedIn: string){
  this.editProfileForm.controls['bio'].setValue(bio);
  this.editProfileForm.controls['location'].setValue(location);
  this.editProfileForm.controls['jobStatus'].setValue(jobStatus);
  this.editProfileForm.controls['specialty'].setValue(specialty);
  this.editProfileForm.controls['portfolioSite'].setValue(portfolioSite);
  this.editProfileForm.controls['github'].setValue(github);
  this.editProfileForm.controls['linkedIn'].setValue(linkedIn);
}
checkOwner(){
  console.log(this.profileToDisplay)
  if(this.user === null){

  }
  else if(this.user.uid === this.profileId){
    this.ownerMode = true;
  }
}

update(){
  var {bio, location, jobStatus, specialty, portfolioSite, github, linkedIn} = this.editProfileForm.value;
  var newProfile = new Profile(bio, location, jobStatus, specialty, portfolioSite, github, linkedIn);
  console.log(this.user.uid);
  this.profileService.updateProfile(newProfile, this.user.uid)
  this.editClicked = null;
}

warnDelete(){
  this.warnModal();
}

warnModal() {
  this.warnAction.emit({action:"modal",params:['open']});
  }

deleteProfile(){
  if(this.user.uid === this.profileId){
    this.profileService.deleteProfile(this.profileId);
    this.authService.logout();
    this.router.navigate(['']);
  }
}




}
