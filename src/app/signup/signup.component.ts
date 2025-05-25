import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../Services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  @ViewChild('signupForm') signupForm!: NgForm;
  isLoading = false;

  loader: LoaderService = inject(LoaderService);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  authService: AuthService = inject(AuthService);

  router: Router = inject(Router);

  ngOnInit() {
    this.loader.$loaderStatus.subscribe((x) => {
      this.isLoading = x;
      this.cdr.detectChanges();
    });
  }

  onSubmit() {
    const user = this.signupForm.value;
    this.loader.showLoader();
    this.authService.signUp(user).subscribe({
      next: (response) => {
        this.loader.hideLoader();
        alert(response.message);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.loader.hideLoader();
        alert(err.error.error);
      },
    });
  }

  resetForm() {
    this.signupForm.reset();
  }
}
