import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.class';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from './../../../services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {
  totalPosts = 0;
  postsPerPage = 2;
  pageSizeOptions = [1,2,5,10];
  currentPage = 1;
  posts: Post[] = [];
  isUserAuthenticated = false;
  private authSubscription: Subscription;
  private subscription: Subscription;

  constructor(
    public postsService:PostService,
    private authService:AuthService,
  ) { }

  ngOnInit() {
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.subscription =  this.postsService.getPostUpdated()
      .subscribe((postData : { posts: Post[], postCount : number}) => {
       this.totalPosts = postData.postCount
       this.posts = postData.posts;
     })
    this.isUserAuthenticated = this.authService.getIsAuth()
    this.authSubscription = this.authService.getAuthStatus().subscribe(
      isAuthenticated => {
        this.isUserAuthenticated = isAuthenticated;
      }
    )
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  onDelete(postId: string) {
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage)
    })
  }

  onChangePage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

}
