import { Component, OnInit, AfterViewInit } from '@angular/core';
import {AuthService} from "./auth.service";
import { Router } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  user: any = null;
  adminMode: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
   this.authService.getCurrentUser().subscribe(user => {
     this.user = user;
     this.test();
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


test(){
  if(this.user){
     return "";
  } else {
    return "dropdown-button btn hide";
  }
}



}
