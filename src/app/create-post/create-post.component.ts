import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PostsService } from '../Services/posts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../Models/post.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  @ViewChild('postForm') postForm!: NgForm;
  isEditMode = false;
  postData: Post | undefined;
  postId: number | undefined;
  title: string = '';
  body: string = '';

  constructor(
    private postService: PostsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.isEditMode = true;
        this.postId = +params.get('id')!;
        this.loadPost(this.postId);
      }
    });
  }

  loadPost(postId: number) {
    this.postService.getPostById(postId).subscribe({
      next: (data: Post) => {
        this.postData = data;
        if (this.postData) {
          this.title = this.postData.title;
          this.body = this.postData.body;
        }
      },
    });
  }

  onCreate() {
    const now = new Date();

    // Extract day, month, and year
    const day = String(now.getDate()).padStart(2, '0'); // Pad single digits with leading zero
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const year = now.getFullYear();

    // Format the date as DD/MM/YYYY
    const createdOn = `${day}/${month}/${year}`;
    let postData: Post = this.postForm.value;
    console.log('post data is ', postData);
    postData = { ...postData, createdOn: createdOn };
    this.post(postData);
  }

  post(data: Post) {
    this.postService.post(data).subscribe({
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        alert('Post created successfully');
        this.router.navigate(['/posts']);
      },
    });
  }

  onSave() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    const modifiedOn = `${day}/${month}/${year}`;
    const patchData = {
      id: this.postId,
      ...this.postForm.value,
      modifiedOn: modifiedOn,
    };
    this.postService.editPost(patchData).subscribe({
      error: (err) => console.log(err),
      complete: () => {
        alert('Post saved successfully');
        this.router.navigate(['/posts']);
      },
    });
  }
}
