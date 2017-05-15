import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostListComponent } from './post-list/post-list.component';
import { NewPostComponent } from './new-post/new-post.component';
const appRoutes: Routes = [


  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'post-list',
    component: PostListComponent
  },
  {
    path: 'new-post',
    component: NewPostComponent
  }
];






  export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
