import {
  ChangeDetectorRef,
  EventEmitter,
  inject,
  Injectable,
  Output,
} from '@angular/core';
import { Post } from '../Models/post.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Subject, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  posts: Post[] = [];

  totalPosts: number | undefined;
  userPosts: number | undefined;

  authService: AuthService = inject(AuthService);
  http: HttpClient = inject(HttpClient);
  // private postsSubject = new BehaviorSubject<Post[]>([]); // Start with an empty array
  // sendPost$ = this.postsSubject.asObservable();

  $postCount = new BehaviorSubject<number>(0);

  apiBaseUrl = `${environment.apiBaseUrl}/posts/`;

  // createPost(postData: Post) {
  //   this.posts.push(postData);
  //   console.log(
  //     'in post service. sending the below data to post comp..,',
  //     this.posts
  //   );
  //   this.event.emit(postData);
  // }

  getAllPosts() {
    return this.http.get<Post[]>(`${this.apiBaseUrl}get-all-posts`);
  }
  getPostById(postId: number) {
    return this.http.get<Post>(`${this.apiBaseUrl}get-post/${postId}`);
  }

  editPost(patchData: Post) {
    return this.http.patch(
      `${this.apiBaseUrl}edit-post/${patchData.id!}`,
      patchData
    );
  }
  deleteAllPosts() {
    return this.http.delete(`${this.apiBaseUrl}delete-all-posts`);
  }
  deletePost(id: number) {
    return this.http.delete(`${this.apiBaseUrl}delete-post/${id}`);
  }
  post(data: any) {
    return this.http.post(`${this.apiBaseUrl}save-post`, data);
  }
}
