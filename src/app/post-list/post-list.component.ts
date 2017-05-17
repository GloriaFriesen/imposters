import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { FirebaseListObservable } from 'angularfire2/database';
import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../user.model';
import { CategoryPipe } from '../category.pipe';



@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: FirebaseListObservable<any[]>;
  user: User;
  categoryFilter: string[] = ["Code Snippet", "Job Tips", "Cool Tech"];
  test: string = "Code Snippet";


  constructor(private router: Router, private postService: PostService, private authService: AuthService) { }

  ngOnInit() {
    this.posts = this.postService.getPosts();
     this.authService.getCurrentUser().subscribe(dataLastSeen => {
       this.user = new User(
      dataLastSeen.displayName,
      dataLastSeen.email,
      dataLastSeen.photoURL
  )
    });
  }

  goToDetailPage(clickedPost) {
    this.router.navigate(['posts', clickedPost.$key]);
  }

search(category){
  console.log(category);
  this.test = category;
}


}
