import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../Services/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @ViewChild('loginUser') loginUser!: NgForm;
  isLoading = false;

  authService: AuthService = inject(AuthService);
  loader: LoaderService = inject(LoaderService);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  router: Router = inject(Router);

  ngOnInit() {
    this.loader.$loaderStatus.subscribe((x) => {
      this.isLoading = x;
      this.cdr.detectChanges();
    });
  }

  onSubmit() {
    const user = this.loginUser.value;
    this.loader.showLoader();
    this.authService.login(user).subscribe({
      next: (response) => {
        this.loader.hideLoader();
        alert(response.message);
        this.router.navigate(['/posts']);
      },
      error: (err) => {
        this.loader.hideLoader();
        alert(err.error.error);
      },
    });
  }

  resetForm() {
    this.loginUser?.reset();
  }
}
