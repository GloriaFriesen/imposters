import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})


export class LoginPageComponent implements OnInit {
  user: any = null;


  constructor(private authService: AuthService) {}

  ngOnInit() {
   this.authService.getCurrentUser().subscribe(user => {
     this.user = user;
   })
 }

 login(){
   this.authService.login();
 }

}
