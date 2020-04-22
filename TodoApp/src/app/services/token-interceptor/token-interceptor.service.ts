import { Injectable, Injector, Inject } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { UserServiceService } from '../user/user-service.service'


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req, next) {
    let userService = this.injector.get(UserServiceService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${userService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}
