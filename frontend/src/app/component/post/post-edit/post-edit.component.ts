import { Component, OnInit } from '@angular/core';
import { Post } from './../../../models/post.class';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  public editForm: FormGroup;
  public postId: string;
  public post : Post;


  constructor(
    private _formBuilder: FormBuilder,
    public postService: PostService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.editForm = this._formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.params['postId'];
    this.loadData();
  }

  loadData(): void {
    this.postService.getPost(this.postId).subscribe(data => {
      this.editForm.patchValue({
        title: data["title"],
        content: data["content"],
      })
    }, error => {

    })

  }

  updatePost() {
    this.postService.updatePost(this.postId,this.editForm.value.title, this.editForm.value.content);
  }



  onReset() {
    this.editForm.reset()
  }

}
