import { Component } from '@angular/core';
import { PostsComponent } from '../posts/posts.component';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [PostsComponent],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css',
})
export class MyProfileComponent {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.$loggedInUser.subscribe();
  }
}
