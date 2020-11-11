import { HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HideSpinner } from '../store/spinner/spinner.actions';

@Injectable()
export class ErrorInterceptor {
    constructor(private store: Store) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error) => this.handleResponse(error))
        );
    }

    private handleResponse(error) {
        this.store.dispatch(new HideSpinner());
        return throwError(error);
    }
}

export const errorInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];