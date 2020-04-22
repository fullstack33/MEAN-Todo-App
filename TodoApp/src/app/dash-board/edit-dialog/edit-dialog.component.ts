import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoServiceService } from 'src/app/services/todo/todo-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  public formObj = {
    title:'',
    body: ''
  }
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    private _todoService: TodoServiceService,
    private _snackBar: MatSnackBar
  ) {
    this.formObj.title = data.title;
    this.formObj.body = data.body;
   }

  ngOnInit(): void { }

  openSnackBar(msg, action) {
    this._snackBar.open(msg, action, {
      duration: 5000
    })
  }


  editTodo(id, data){
    this._todoService.updateTodo(id, data)
    .subscribe(
      res => {
        // console.log(res)
        this.openSnackBar("Updated Successfully ..!!", "Dismiss")
      },
      err => console.log(err)
    )
  }

}
