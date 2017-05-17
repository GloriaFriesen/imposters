import { Component, OnInit } from '@angular/core';
import {AuthService} from "./auth.service";
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  user: any = null;
  loginClass: any = 'dropdown-button btn';
  nologinClass: any = 'test';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
   this.authService.getCurrentUser().subscribe(user => {
     this.user = user;
   })
 }

 login(){
   this.authService.login();
 }

 logout() {
  this.authService.logout();
  this.router.navigate(['']);
 }

 userProfile(){
   this.router.navigate(['profiles/', this.user.uid]);
 }



}
