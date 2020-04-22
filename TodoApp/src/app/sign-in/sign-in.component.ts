import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user/user-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  durationInSeconds = 5;
  hide = true;

  constructor(
    private _userService: UserServiceService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  openSnackBar(msg, action) {
    this._snackBar.open(msg, action, {
      duration: this.durationInSeconds * 1000
    })
  }

  signInUser(data) {
    console.log(data)
    this._userService.signInUser(data)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem("token", res.token);
          this._router.navigate(['dashboard/'])
        },
        err => { 
          console.log(err) 
          this.openSnackBar(err.error.message, 'Dismiss')
        }
      )
  }

}
