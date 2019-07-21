import { Component, OnInit, Inject, AfterViewInit, AfterViewChecked } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentModel } from 'src/app/model/student.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { UploadModel } from 'src/app/model/upload.model';

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
  }

  public isLoading: boolean;
  public photo: UploadModel = new UploadModel();
  public grades = ['A++', 'A+', 'A', 'B', 'C', 'D'];
  private basePath = '/images';
  public studentForm = new FormGroup({
    key: new FormControl(''),
    photoDirectory: new FormControl(''),
    photoName: new FormControl(''),
    photoUrl: new FormControl(''),
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
    setTimeout(() => {
      if (this.data) {
        this.data.dateOfBirth = new Date(this.data.dateOfBirth);
        this.studentForm.setValue(this.data);
      }
    }, 1);
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
    this.isLoading = true;
    if (!this.data) {
      if (this.photo.file) {
        const photoName = new Date().getTime().toString() + '_' + this.photo.file.name;
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(
          `${this.basePath}/${photoName}`).put(this.photo.file);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
        },
          (error) => {
            console.log(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.studentForm.value.photoUrl = downloadURL;
              this.studentForm.value.photoName = photoName;
              this.studentForm.value.photoDirectory = this.basePath;
              this.studentForm.value.dateOfBirth = this.studentForm.value.dateOfBirth.toString();
              this.db.list('students').push(this.studentForm.value).then(res => {
                this.dialogRef.close();
              }).catch((error: any) => {
                this.isLoading = false;
              });
            });
          }
        );
      } else {
        this.studentForm.value.dateOfBirth = this.studentForm.value.dateOfBirth.toString();
        this.db.list('students').push(this.studentForm.value).then(res => {
          this.dialogRef.close();
        });
      }
    } else {
      if (this.photo.file) {
        const photoName = new Date().getTime().toString() + '_' + this.photo.file.name;
        const storageRef = firebase.storage().ref();
        storageRef.child(this.data.photoDirectory + '/' + this.data.photoName).delete().then((result: any) => { })
          .finally(() => {
            const uploadTask = storageRef.child(
              `${this.basePath}/${photoName}`).put(this.photo.file);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
            },
              (error) => {
                console.log(error);
              },
              () => {
                uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                  this.studentForm.value.photoUrl = downloadURL;
                  this.studentForm.value.photoName = photoName;
                  this.studentForm.value.photoDirectory = this.basePath;
                  this.studentForm.value.dateOfBirth = this.studentForm.value.dateOfBirth.toString();
                  this.db.list('students/').update(this.data.key, this.studentForm.value).then(() => {
                    this.dialogRef.close();
                  });
                });
              }
            );
          });
      } else {
        this.studentForm.value.dateOfBirth = this.studentForm.value.dateOfBirth.toString();
        const storageRef = firebase.storage().ref();
        storageRef.child(this.data.photoDirectory + '/' + this.data.photoName).delete().then((result: any) => { });
        this.db.list('students/').update(this.data.key, this.studentForm.value).then(() => {
          this.dialogRef.close();
        });
      }
    }
  }

  onSelectFile(selectedFile: File) {
    const mimeType = selectedFile.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = (event: any) => {
      if (this.data) {
        this.data.photoUrl = reader.result.toString();
      }
      this.photo.url = reader.result.toString();
      this.photo.file = selectedFile;
    };
  }

  disableRemovePhoto() {
    if (this.photo.url) {
      return false;
    }
    if (this.data) {
      if (this.data.photoUrl) {
        return false;
      }
    }
    return true;
  }

  removePhoto() {
    this.photo.url = '';
    if (this.data) {
      this.data.photoUrl = '';
    }
  }
}
