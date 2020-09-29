import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(
        private router: Router,
        private tokeService: TokenStorageService
    ) { }

    canActivate(): Observable<boolean> {
        const tokenExist = this.tokeService.tokenExist();
        if (!tokenExist) {
            this.router.navigate(['login']);
        }
        return of(tokenExist);
    }

}
