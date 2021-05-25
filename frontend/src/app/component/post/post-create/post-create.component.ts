import { Component, OnInit,} from '@angular/core';
import { Post } from './../../../models/post.class';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  public postForm: FormGroup;
  imagePreview: string;

  constructor(
    private _formBuilder: FormBuilder,
    public postService: PostService,
  ) {}

  ngOnInit(): void {
    this.postForm = this._formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      image: ['', [Validators.required]],
    })
  }


  onImagePicker(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({ image: file });
    this.postForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  addPost() {
    if(this.postForm.invalid){
      return
    }
    this.postService.addPost(this.postForm.value.title, this.postForm.value.content,this.postForm.value.image);
  }

  onReset() {
    this.postForm.reset()
  }
}
