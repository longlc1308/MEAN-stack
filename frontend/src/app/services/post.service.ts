import { Injectable } from '@angular/core';
import { Post } from './../models/post.class';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';





@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly API_URL = environment.api_url + '/posts'

  private posts: Post[] = [];
  private postsUpdated = new Subject<{posts: Post[] ; postCount: number}>();
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  getPosts(postsPerPage: number, currentPage: number) {
      const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`
      this.httpClient.get<{ posts: any, maxPosts: number}>(this.API_URL + queryParams)
      .pipe(map((postData) => {
        return { posts: postData.posts.map((post) => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath
          };
        }), maxPosts : postData.maxPosts};
      }))
      .subscribe(TransformedPostsData => {
      this.posts = TransformedPostsData.posts;
      this.postsUpdated.next({posts: [...this.posts], postCount:TransformedPostsData.maxPosts});
    })
  }

  getPostUpdated() {
    return this.postsUpdated.asObservable();
  }


  getPost(id: string) {
    return this.httpClient.get(this.API_URL + '/edit/' + id)
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title),
    postData.append("content", content),
    postData.append("image", image, title)
    this.httpClient.post<{ message: string, post: Post }>(this.API_URL, postData)
      .subscribe(Data => {
        this.router.navigate(['/'])
      });
  }


  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content, imagePath: null };
    this.httpClient.put(this.API_URL + '/' + id, post)
      .subscribe(data => {
        this.router.navigate(['/']);
      })
  }



  deletePost(postId: string) {
    return this.httpClient.delete(this.API_URL + '/' + postId);
  }
}
