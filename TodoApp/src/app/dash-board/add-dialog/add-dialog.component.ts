import { Component, OnInit } from '@angular/core';
import { TodoServiceService } from 'src/app/services/todo/todo-service.service';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  public userId;

  constructor(
    private _todoService: TodoServiceService,
    private _userService: UserServiceService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {

    _userService.getUserProfile().subscribe(
      res => {
        // console.log(res[0]._id), 
        this.userId = res[0]._id
      },
      err => console.log(err)
    )
  }

  ngOnInit(): void {
  }

  openSnackBar(msg, action) {
    this._snackBar.open(msg, action, {
      duration: 5000
    })
  }

  saveTodo(data) {
    let todoObj = {
      userId: this.userId,
      title: data.title,
      body: data.body
    }
    this._todoService.saveTodos(todoObj).subscribe(
      res => {
        // console.log(res),
        this.openSnackBar("Save Successfully", "Dismiss")
        this._router.navigate(['/dashboard'])
      },
      err => console.log(err)
    )
  }

}
