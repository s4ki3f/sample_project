import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModel } from './user-dashboard.model';
import { ApiService } from '../shared/api.service';
import { environment } from '../../environments/environment';



@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

  userForm !: FormGroup;
  userModelObj: UserModel = new UserModel();
  userData: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    const apiKey = environment.apiKey;
    const apiUrl = environment.apiUrl;
    this.userForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      role: [''],
    })
    this.getUserDetails();
  }
  clickAddUser() {
    this.userForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postUserDetails() {
    this.userModelObj.firstname = this.userForm.value.firstname;
    this.userModelObj.lastname = this.userForm.value.lastname;
    this.userModelObj.email = this.userForm.value.email;
    this.userModelObj.role = this.userForm.value.role;

    this.api.postUser(this.userModelObj)
      .subscribe(res => {
        console.log(res);
        alert("User Added Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.userForm.reset();
        this.getUserDetails();
      },
        err => {
          alert("Something went wrong")
        })
  }
  getUserDetails() {
    this.api.getUser()
      .subscribe(res => {
        this.userData = res;
        console.log(res);
      })
  }
  deleteUser(user: any) {
    this.api.deleteUser(user.id)
      .subscribe(res => {
        alert("User Deleted");
        this.getUserDetails();
      })
  }
  onEdit(user: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.userModelObj.id = user.id;
    this.userForm.controls['firstname'].setValue(user.firstname);
    this.userForm.controls['lastname'].setValue(user.lastname);
    this.userForm.controls['email'].setValue(user.email);
    this.userForm.controls['role'].setValue(user.role);
  }
  updateUserDetails() {
    this.userModelObj.firstname = this.userForm.value.firstname;
    this.userModelObj.lastname = this.userForm.value.lastname;
    this.userModelObj.email = this.userForm.value.email;
    this.userModelObj.role = this.userForm.value.role;

    this.api.updateUser(this.userModelObj, this.userModelObj.id)
      .subscribe(res => {
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.userForm.reset();
        this.getUserDetails();
      })
  }
}
