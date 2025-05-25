import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostsComponent } from './posts/posts.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './Services/auth.guard.service';
import { CreatePostComponent } from './create-post/create-post.component';
import { MyProfileComponent } from './my-profile/my-profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'posts',
    component: PostsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-post',
    component: CreatePostComponent,
  },
  {
    path: 'edit-post/:id',
    component: CreatePostComponent,
  },

  { path: 'my-posts', component: PostsComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];
