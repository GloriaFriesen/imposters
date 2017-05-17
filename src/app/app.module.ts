import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'angular2-materialize';
import { HomeComponent } from './home/home.component';

import { AppComponent } from './app.component';
import { masterFirebaseConfig } from './api-keys';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { ProfileService } from './profile.service';
import { AuthService } from './auth.service';
import { PostService } from './post.service';
import { routing } from './app.routing';
import { PostListComponent } from './post-list/post-list.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AllProfilesComponent } from './all-profiles/all-profiles.component';
import { CategoryPipe } from './category.pipe';
import { SearchProfilesPipe } from './search-profiles.pipe';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';




export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostListComponent,
    NewPostComponent,
    PostDetailComponent,
    UpdateProfileComponent,
    AllProfilesComponent,
    CategoryPipe,
    SearchProfilesPipe,
    ProfileDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    MaterializeModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [AuthService, PostService, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
