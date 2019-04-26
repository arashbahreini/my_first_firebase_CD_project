import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentModel } from 'src/app/model/student.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit.dialog',
  templateUrl: './add-edit.dialog.component.html',
  styleUrls: ['./add-edit.dialog.component.sass']
})
export class AddEditDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentModel
  ) { }

  public studentForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    age: new FormControl('', [Validators.required, Validators.max(100)])
  });

  get firstName() { return this.studentForm.get('firstName'); }
  get lastName() { return this.studentForm.get('lastName'); }
  get age() { return this.studentForm.get('age'); }

  ngOnInit() {
  }

  prevent(event) {
    if (!this.studentForm.valid) {
      event.preventDefault();
    } else {
      this.save();
    }
  }

  save() {
    return;
    console.log(this.studentForm);
    console.log(this.firstName);
  }
}
