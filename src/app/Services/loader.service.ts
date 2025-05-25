import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  $loaderStatus = new BehaviorSubject<boolean>(false);
  constructor() {}

  showLoader() {
    this.$loaderStatus.next(true);
  }
  hideLoader() {
    this.$loaderStatus.next(false);
  }
}
