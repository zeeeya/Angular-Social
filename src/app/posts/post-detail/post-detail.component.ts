import { Component, Input } from '@angular/core';

import { PostService } from '../post.service';

import { Post } from '../post-model';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent {

  @Input()
  post: Post;

  constructor(private postService: PostService) { }

  likeToPost(val: number) {
    if (this.post.id) {
      this.postService.updatePost(this.post.id, { hearts: val + 1 });
    } else {
      console.error('Post missing ID!');
    }
  }

  dislikeToPost(val: number) {
    if (this.post.id) {
      this.postService.updatePost(this.post.id, { hearts: val - 1 });
    } else {
      console.error('Post missing ID!');
    }
  }

  deletePost(id: string) {
    this.postService.deletePost(id);
  }
 updatePost(content: string){
  }

}
