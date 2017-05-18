import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { MaterializeAction } from 'angular2-materialize';
import { FirebaseListObservable } from 'angularfire2/database';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


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
category: string[] = ["Code Snippet", "Job Tips", "Cool Tech"];
editPostForm: FormGroup;
Materialize:any;


  constructor( private router: Router, private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private location: Location, private postService: PostService) { }

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


  instantiateForm(){
    this.editPostForm = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
    category: ['', Validators.required],
    })
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
      this.instantiateForm();
      this.setForm(this.postToDisplay.category, this.postToDisplay.title, this.postToDisplay.content);
    } else {
      this.editClicked = null;
    }
  }

  setForm(category: string, title: string, content: string){
  this.editPostForm.controls['category'].setValue(category);
  this.editPostForm.controls['title'].setValue(title);
  this.editPostForm.controls['content'].setValue(content);
}

  editPost(){
  var {title, content, category, userId, userName} = this.editPostForm.value;
    var updatedPost = new Post(title, content, category, this.postToDisplay.userId, this.postToDisplay.displayName);
    this.postService.updatePost(this.postId, updatedPost);
    this.editClicked = null;
}

warnDelete(){
  this.warnModal();
}

deletePost(){
  if(this.user.uid === this.postToDisplay.userId) {
    this.postService.deletePost(this.postId);
    this.router.navigate(['post-list']);
  } else{
    alert("how did you get here?");
  }
}

}
