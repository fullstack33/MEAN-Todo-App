import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewModalBox } from './view-modal/view-modal';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoServiceService } from '../services/todo/todo-service.service';
import { UserServiceService } from '../services/user/user-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  public userId = '';
  public opened: boolean;
  events: string[] = [];
  public todos = [];


  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private _todoService: TodoServiceService,
    private _userService: UserServiceService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    
  }

  ngOnInit(): void {
    this.getTodosData()
  }

  getTodosData(){
    this._userService.getUserProfile().subscribe(
      res => {
        this._todoService.getTodos(res[0]._id).subscribe(
          res => this.todos = res,
          err => console.log(err)
        )
      },
      err => console.log(err)
    )
  }

  openSnackBar(msg, action) {
    this._snackBar.open(msg, action, {
      duration: 5000
    })
  }

  openViewDialog(todo): void {
    const dialogRef = this.dialog.open(ViewModalBox, {
      width: '100%',
      data: todo
    });
  }

  openEditDialog(todo) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '100%',
      minHeight: "50%" ,
      data: todo
    }, );
    dialogRef.afterClosed().subscribe( result =>
      this.getTodosData()
    )
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '100%',
      minHeight: "50%" ,
    });
    dialogRef.afterClosed().subscribe( result =>
      this.getTodosData()
    )
  }
  
  deleteTodo(id){
    // console.log(id)
    this._todoService.deleteTodo(id)
    .subscribe(
      res => {
        // console.log(res)
        this.getTodosData()
        this.openSnackBar("Deleted Successfully ..!!", 'Dismiss')
      },
      err => console.log(err)
    )
  }

}