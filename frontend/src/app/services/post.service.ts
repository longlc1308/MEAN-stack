import { Injectable } from '@angular/core';
import { Post } from './../models/post.class';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly API_URL = environment.api_url + '/posts'

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>()
  constructor(
    private httpClient: HttpClient
  ) { }

  getPosts() {
      this.httpClient.get<{ message: string, posts: any }>(this.API_URL)
      .pipe(map((postData) => {
        return postData.posts.map((post) => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe(TransformedPosts => {
      this.posts = TransformedPosts;
      this.postsUpdated.next([...this.posts])
    })
  }

  getPostUpdated() {
    return this.postsUpdated.asObservable();
  }


  getPost(id: string) {
    return this.httpClient.get(this.API_URL + '/edit/' + id)
  }

  addPost(title: string, content: string) {
    const post: Post = {
      id:null,
      title: title,
      content: content
    };
    this.httpClient.post<{ message: string, postId: string }>(this.API_URL, post)
      .subscribe(Data => {
        const id = Data.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }


  updatePost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };
    this.httpClient.put(this.API_URL + '/' + id, post)
      .subscribe(data => {
        console.log(data)
      })
  }



  deletePost(postId: string) {
    this.httpClient.delete(this.API_URL + '/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      })
  }
}
