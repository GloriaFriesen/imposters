import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { NewPostComponent } from './new-post/new-post.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AllProfilesComponent } from './all-profiles/all-profiles.component';

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
  },
  {
    path: 'posts/:id',
    component: PostDetailComponent
  },
  {
    path: 'update-profile',
    component: UpdateProfileComponent
  },
  {
    path: 'all-profiles',
    component: AllProfilesComponent
  }

];


  export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
