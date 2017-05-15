import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomeComponent } from './home/home.component';
import { PostListComponent } from './post-list/post-list.component';
const appRoutes: Routes = [

  {
    path: '',
    component: LoginPageComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'post-list',
    component: PostListComponent
  }
];






  export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
