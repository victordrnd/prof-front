import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinService } from '../services/spin.service';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private userService: AuthService,
    private spinService : SpinService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {};
    this.spinService.setLoading(true);
    const token = this.userService.getToken();
    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }
    const request = req.clone({ setHeaders: headersConfig });
    
    return next.handle(request).pipe(finalize(() => setTimeout(() => this.spinService.setLoading(false), 100)));
  }
}