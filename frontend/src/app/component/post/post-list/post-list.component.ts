import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.class';
import { PostService } from './../../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {

  posts: Post[] = [];
  private subscription: Subscription;

  constructor(
    public postsService:PostService
  ) { }

  ngOnInit(): void {
    this.postsService.getPosts();
    this.subscription =  this.postsService.getPostUpdated()
      .subscribe((post: Post[]) => {
       this.posts = post;
     })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  onDelete(postId) {
    this.postsService.deletePost(postId);
  }

}
