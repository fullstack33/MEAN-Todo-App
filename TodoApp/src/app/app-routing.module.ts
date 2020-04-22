import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { AddDialogComponent } from './dash-board/add-dialog/add-dialog.component';


const routes: Routes = [
  { path: '', redirectTo: '/signIn', pathMatch: 'full'},
  {
    path: 'dashboard', 
    component: HomeComponent ,
    children: [
      { path: '', component: DashBoardComponent, canActivate: [AuthGuard], },
      // { path: 'add', component: AddDialogComponent, canActivate: [AuthGuard], },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], }
    ]
  },
  { path: 'signIn', component: SignInComponent },
  { path: 'signUp', component: SignUpComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponent = [
  HomeComponent,
  DashBoardComponent,
  SignInComponent,
  SignUpComponent,
  ProfileComponent,
  AddDialogComponent
]
