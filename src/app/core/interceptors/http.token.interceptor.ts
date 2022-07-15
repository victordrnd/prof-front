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
import { environment } from 'src/environments/environment';


@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(private userService: AuthService,
    private spinService : SpinService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig = {};
    this.spinService.setLoading(true);
    const token = this.userService.getToken();
    let request = req.clone();
    if (token) {
      if(req.url.includes(environment.apiUrl) || req.url.includes(environment.chatServer)){
        headersConfig['Authorization'] = `Bearer ${token}`;
        request = req.clone({ setHeaders: headersConfig });
      }
    }
    
    return next.handle(request).pipe(finalize(() => setTimeout(() => this.spinService.setLoading(false), 100)));
  }
}