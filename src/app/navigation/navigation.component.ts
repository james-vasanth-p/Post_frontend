import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { CommonModule } from '@angular/common';
import { PostsService } from '../Services/posts.service';
import { LoggedInUserData } from '../Models/user.model';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  constructor(private renderer: Renderer2, private element: ElementRef) {}

  showProfile = false;
  userName: string | undefined;
  userEmail: string | undefined;
  noOfPosts = 0;
  closeMenuBar = false;
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  postService: PostsService = inject(PostsService);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  // @ViewChild('navbar') navbar: ElementRef | undefined;
  isUserSignedIn: boolean = false;

  ngOnInit() {
    this.authService.userSignedIn$.subscribe((x) => {
      this.isUserSignedIn = x;
      this.showProfile = false;
    });
    this.authService.$loggedInUser.subscribe({
      next: (x: LoggedInUserData | null) => {
        this.userName = x?.loggedInUserName;
        this.userEmail = x?.loggedInUserEmail;
      },
    });

    this.postService.$postCount.subscribe((x) => {
      this.noOfPosts = x;
    });
  }

  onLogout() {
    const res = confirm('You really want to logout?');
    if (res) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  onProfile() {
    this.showProfile = !this.showProfile;
  }

  showMyPosts() {
    this.showProfile = !this.showProfile;
  }

  closeNavbar() {
    const mobile = this.element.nativeElement.querySelector('.mobile');
    this.renderer.setStyle(mobile, 'display', 'none');
  }
  ngAfterViewInit() {}
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const mobile = this.element.nativeElement.querySelector('.mobile');
    const navbar = this.element.nativeElement.querySelector('#menu-icon');
    const profile_details =
      this.element.nativeElement.querySelector('.profile_details');
    if (navbar.contains(event.target)) return;
    const mobilecurrentDisplay = mobile.style.display;
    if (profile_details)
      this.renderer.setStyle(profile_details, 'display', 'none');

    if (mobilecurrentDisplay === 'block') {
      this.renderer.setStyle(mobile, 'display', 'none');
    }
  }

  onMenu() {
    const navbar = this.element.nativeElement.querySelector('#menu-icon');
    const mobile = this.element.nativeElement.querySelector('.mobile');
    const mobilecurrentDisplay = mobile.style.display;

    if (mobilecurrentDisplay === 'none') {
      this.renderer.setStyle(mobile, 'display', 'block');
    } else this.renderer.setStyle(mobile, 'display', 'none');
  }
}
