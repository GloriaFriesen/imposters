import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterializeAction } from 'angular2-materialize';
import { Post } from '../post.model';
import { MaterializeModule } from "angular2-materialize";
import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { AuthService } from "../auth.service";



@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
user: any = null;
newPostForm: FormGroup;
warnAction = new EventEmitter;
category: string[] = ["Code Snippet", "Job Tips", "Cool Tech"];
  constructor(private fb: FormBuilder, private postService: PostService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    })
      this.newPostForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: ['', Validators.required],
        })
  }

  warnModal(){
    this.warnAction.emit({action:"modal",params:['open']});
  }

  addPost(){
    console.log(this.user.uid)
    var {title, content, category, userId} = this.newPostForm.value;
    if(title.length < 0 || content.length < 0) {
      this.warnModal();
    } else {
      var newPost = new Post(title, content, category, this.user.uid);
      this.postService.savePost(newPost);
      this.newPostForm.reset();
      this.router.navigate(['post-list']);
    }
  }

}
