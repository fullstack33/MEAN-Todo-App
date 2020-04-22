import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { materialComponents } from './MaterialComponent/materialComponent';
import { EditDialogComponent } from './dash-board/edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './dash-board/add-dialog/add-dialog.component';
import { UserServiceService } from './services/user/user-service.service';
import { TodoServiceService } from './services/todo/todo-service.service';
import { AuthGuard } from './auth/auth.guard';
import { TokenInterceptorService } from './services/token-interceptor/token-interceptor.service';
import { RegisterLoginUserComponent } from './register-login-user/register-login-user.component';
import { ViewModalBox } from './dash-board/view-modal/view-modal';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SidebarComponent,
    routingComponent,
    EditDialogComponent,
    AddDialogComponent,
    RegisterLoginUserComponent,
    ViewModalBox,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    materialComponents,
    HttpClientModule
  ],
  providers: [UserServiceService, TodoServiceService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
