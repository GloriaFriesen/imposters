import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { FirebaseListObservable } from 'angularfire2/database';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {
  user: any = null;
  postId: string;
  postToDisplay;
  editClicked: any = null;
  ownerMode: any = null;
  warnAction = new EventEmitter;

  constructor(private authService: AuthService, private route: ActivatedRoute, private location: Location, private postService: PostService) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.postId = urlParameters['id'];
    });
    this.postService.getPostById(this.postId).subscribe(postToDisplay => {
      this.postToDisplay = postToDisplay;


    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.checkOwner()
    });
  });
  }

  warnModal(){
    this.warnAction.emit({action:"modal",params:['open']});
  }

  checkOwner(){
    if(this.user === null){

    }
    else if(this.user.uid === this.postToDisplay.userId){
      this.ownerMode = true;
    }
  }

  showEdit(){
    if(this.editClicked === null){
      this.editClicked = true;
    } else {
      this.editClicked = null;
    }
  }

}
