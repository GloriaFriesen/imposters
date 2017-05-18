import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Post } from './post.model';

@Injectable()
export class PostService {
  posts: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.posts = database.list('posts');
  }

  getPosts() {
    return this.posts;
  }

  savePost(post){
    this.posts.push(post);
  }

  getPostById(postId: string) {
  return this.database.object('posts/' + postId);
}

updatePost(postId, post){
   var postToUpdate = this.getPostById(postId);
  postToUpdate.update({
    category: post.category,
    content: post.content,
    title: post.title,
  })
}

deletePost(postId){
  var postToDelete = this.getPostById(postId)
  postToDelete.remove();
}


}
