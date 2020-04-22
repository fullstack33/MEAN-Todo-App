import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UserServiceService } from '../services/user/user-service.service';
import { User } from '../model/user';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  durationInSeconds = 5;
  hide = true;

  constructor(private _userService: UserServiceService, 
    private _router: Router, 
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  userModel = new User('', '', '', '', null, '', '');

  openSnackBar(msg, action) {
    this._snackBar.open(msg, action, {
      duration: this.durationInSeconds * 1000
    })
  }

  signUpUser(){
    console.log(this.userModel);
    this._userService.signUpUser(this.userModel)
    .subscribe(
      res => { 
        console.log(res.userId)
        localStorage.setItem("token", res.token);
        this._router.navigate(['/dashboard'])
      },
      err => {
        console.log(err.error.message)
        this.openSnackBar(err.error.message, 'Dismiss')
      }
    )
  }

}
