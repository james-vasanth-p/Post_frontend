import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { PostsService } from '../Services/posts.service';
import { Post } from '../Models/post.model';
import { CommonModule } from '@angular/common';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { LoggedInUserData } from '../Models/user.model';
import { LoaderService } from '../Services/loader.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent {
  posts: Post[] = [];
  loggedInUserPosts: Post[] = [];
  loggedUserName: string | undefined;
  totalPosts: number = 0;
  myPostFilter = false;
  isLoading: boolean = false;
  constructor(
    private cdr: ChangeDetectorRef,
    private postService: PostsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private loader: LoaderService
  ) {
    this.authService.$loggedInUser.subscribe({
      next: (userLoggedInData: LoggedInUserData | null) => {
        this.loggedUserName = userLoggedInData?.loggedInUserName;
      },
    });
  }

  ngOnInit() {
    const data = this.route.snapshot.url.map((x) => x.path);
    this.loader.$loaderStatus.subscribe((x) => {
      this.isLoading = x;
      this.cdr.detectChanges();
    });
    if (data[0].includes('my-posts')) {
      this.myPostFilter = true;
    }
    this.getAllPosts();
  }

  getAllPosts() {
    this.loader.showLoader();
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = [];
        data.forEach((post) => {
          this.posts.push(post);
        });
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.cdr.detectChanges();
        this.loader.hideLoader();
        this.getMyPosts();
      },
    });
  }

  getMyPosts() {
    this.loggedInUserPosts = this.posts.filter(
      (x) => x.userName == this.loggedUserName
    );

    this.postService.$postCount.next(this.loggedInUserPosts.length);
    if (this.myPostFilter) {
      this.posts = this.loggedInUserPosts;
      this.cdr.detectChanges();
    }
  }

  onDeletePost(id: number) {
    const res = confirm('Are you sure to delete this post?');
    if (res) {
      this.postService.deletePost(id).subscribe({
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          this.getAllPosts();
        },
      });
    }
  }

  deleteAllPosts() {
    this.posts = [];
    this.postService.deleteAllPosts().subscribe({
      error: (err) => {
        console.log(err);
      },
    });
  }

  onEditPost(postId: number) {
    this.router.navigate(['/edit-post', postId]);
  }
}
