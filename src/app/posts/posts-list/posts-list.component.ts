import { Component, OnInit } from '@angular/core';

import { PostService } from '../post.service';

import { Post } from '../post-model';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {

  posts: Observable<Post[]>;
  content: string;

  constructor(private postService: PostService) { }

  ngOnInit() {
    // this.posts = this.postService.getData()
    this.posts = this.postService.getSnapshot();
  }

  createPost() {
    this.postService.create(this.content);
    this.content = '';
  }

}
