import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, EMPTY, of, tap, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 0) {
        alert('Error connecting with backend. Try again later..');
        return EMPTY;
      } else return throwError(() => err);
    })
  );
};
