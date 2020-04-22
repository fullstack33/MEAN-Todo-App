import { Component, OnInit, Input } from '@angular/core';
import { UserServiceService } from '../services/user/user-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() node
  public currentUser;

  constructor(private _userService: UserServiceService, private _snackBar: MatSnackBar) { 
  }

  ngOnInit(): void {
    this.getUserDetails()
  }

  openSnackBar(msg, action) {
    this._snackBar.open(msg, action, {
      duration: 5000
    })
  }

  getUserDetails() {
    this._userService.getUserProfile()
    .subscribe(
      res => {
        this.currentUser = res[0]
      },
      err => console.log(err)
    )
  }

  fileSubmit(id, file){
    // console.log(file.item(0))
    const formData = new FormData();
    formData.append('file', file.item(0))
    console.log(formData)
    this._userService.uploadPic(id, formData).subscribe(
      res => {
        console.log(res)
        this.openSnackBar(res.message, "Dismiss")
      },
      err => console.log(err)
    )
  }

  updateDetails(id, data){
    this._userService.updateUser(id, data)
    .subscribe(
      res => {
        console.log(res)
        this.getUserDetails()
        this.openSnackBar(res.message, "Dismiss")
      },
      err => console.log(err)
    )
  }

}
