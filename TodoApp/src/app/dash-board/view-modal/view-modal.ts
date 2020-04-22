import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';


@Component({
  selector: 'view-modal-box',
  templateUrl: 'view-modal-box.html',
})
export class ViewModalBox {

  constructor(
    public dialogRef: MatDialogRef<ViewModalBox>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}