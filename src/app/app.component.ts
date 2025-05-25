import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { LoaderService } from './Services/loader.service';
import { LoaderComponent } from './loader/loader.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, LoaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend-auth';
  isLoading: boolean = false;

  constructor(
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loaderService.$loaderStatus.subscribe({
      next: (data) => {
        this.isLoading = data;
        this.cdr.detectChanges();
      },
    });
  }
}
