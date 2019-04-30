import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentModel } from 'src/app/model/student.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-add-edit.dialog',
  templateUrl: './add-edit.dialog.component.html',
  styleUrls: ['./add-edit.dialog.component.sass']
})
export class AddEditDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentModel,
    private db: AngularFireDatabase
  ) {
    if (this.data) {
      this.data.dateOfBirth = new Date(this.data.dateOfBirth);
      this.studentForm.setValue(this.data);
    }
  }

  public grades = ['A++', 'A+', 'A', 'B', 'C', 'D'];
  public studentForm = new FormGroup({
    key: new FormControl(''),
    firstName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    age: new FormControl('', [Validators.required, Validators.max(100)]),
    grade: new FormControl('', Validators.required),
    address: new FormGroup({
      city: new FormControl(''),
      street: new FormControl('')
    }),
    workEligible: new FormControl(''),
    dateOfBirth: new FormControl('', Validators.required)
  });

  get firstName() { return this.studentForm.get('firstName'); }
  get lastName() { return this.studentForm.get('lastName'); }
  get age() { return this.studentForm.get('age'); }
  get grade() { return this.studentForm.get('grade'); }
  get dateOfBirth() { return this.studentForm.get('dateOfBirth'); }
  get address() {
    return {
      city: this.studentForm.get('address').get('city'),
    };
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  prevent(event) {
    if (!this.studentForm.valid) {
      event.preventDefault();
    } else {
      this.save();
    }
  }

  save() {
    if (!this.data) {
      this.studentForm.value.dateOfBirth = this.studentForm.value.dateOfBirth.toString();
      this.db.list('students').push(this.studentForm.value).then(res => {
        this.dialogRef.close();
      });
    } else {
      this.studentForm.value.dateOfBirth = this.studentForm.value.dateOfBirth.toString();
      this.db.list('students/').update(this.data.key, this.studentForm.value).then(() => {
        this.dialogRef.close();
      });
    }
  }
}
