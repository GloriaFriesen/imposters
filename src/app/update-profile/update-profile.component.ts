import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Profile } from '../profile.model';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterializeAction } from 'angular2-materialize';

declare var jQuery: any;

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  user: any = null;
  updateForm: FormGroup;
  Profile;
  profileToEdit;
  Materialize: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private profileService: ProfileService, private router: Router) { }

  ngOnInit() {

  this.setupForm();

    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;

    this.profileService.getUserById(this.user.uid).subscribe(profileToEdit => {
      this.profileToEdit = profileToEdit;

      this.now();

    });

  })
  }

now(){
    this.setFormValues(this.profileToEdit.bio, this.profileToEdit.location, this.profileToEdit.jobStatus, this.profileToEdit.specialty, this.profileToEdit.portfolioSite, this.profileToEdit.github, this.profileToEdit.linkedIn);}

  update(){
    var {bio, location, jobStatus, specialty, portfolioSite, github, linkedIn} = this.updateForm.value;
    var newProfile = new Profile(bio, location, jobStatus, specialty, portfolioSite, github, linkedIn);
    console.log(this.user.uid);
    this.profileService.updateProfile(newProfile, this.user.uid)
    this.router.navigate(['profiles/', this.user.uid]);
  }

  setFormValues(bio: string, location: string, jobStatus: string, specialty: string, portfolioSite: string, github: string, linkedIn: string){
    this.updateForm.controls['bio'].setValue(bio);
    this.updateForm.controls['location'].setValue(location);
    this.updateForm.controls['jobStatus'].setValue(jobStatus);
    this.updateForm.controls['specialty'].setValue(specialty);
    this.updateForm.controls['portfolioSite'].setValue(portfolioSite);
    this.updateForm.controls['github'].setValue(github);
    this.updateForm.controls['linkedIn'].setValue(linkedIn);
  }

  setupForm(){
    this.updateForm = this.fb.group({
      bio: [ Validators.required],
      location: [ Validators.required],
      jobStatus: [ Validators.required],
      specialty: [ Validators.required],
      portfolioSite: [ Validators.required],
      github: [ Validators.required],
      linkedIn: [ Validators.required],
    })
  }

}
