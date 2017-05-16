import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {MaterializeAction} from 'angular2-materialize';
import { Post } from '../post.model';
import { MaterializeModule } from "angular2-materialize";
import { Router } from '@angular/router';
import { PostService } from '../post.service';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
newPostForm: FormGroup;
warnAction = new EventEmitter;
categories: string[] = ["Code Snippet", "Job Tips", "Cool Tech"];

  constructor(private fb: FormBuilder, private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.newPostForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      categories: ['', Validators.required],
    })
  }

  warnModal(){
    this.warnAction.emit({action:"modal",params:['open']});
  }

  addPost(){
    var {title, content, categories} = this.newPostForm.value;
    if(title.length < 5 || content.length < 10) {
      this.warnModal();
    } else {
      var newPost = new Post(title, content, categories);
      this.postService.savePost(newPost);
      this.newPostForm.reset();
      this.router.navigate(['post-list']);
    }
  }

}
