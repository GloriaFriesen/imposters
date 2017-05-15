import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [

  {
    path: '',
    component: LoginPageComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];






  export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
