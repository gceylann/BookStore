import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserInfos } from 'src/app/models/auth/user-infos';
import { UserPasswordChangingModel } from 'src/app/models/auth/user-password-changing';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-password-update',
  templateUrl: './user-password-update.component.html',
  styleUrls: ['./user-password-update.component.css']
})
export class UserPasswordUpdateComponent implements OnInit {

  user:UserInfos;
  userPasswordChangingModel:UserPasswordChangingModel;
  userPasswordUpdateForm:FormGroup;

  constructor(private authService:AuthService,
              private userService:UserService,
              private toastrService:ToastrService,
              private localStorage:LocalStorageService,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    let email = this.localStorage.get("email");
    this.getUserByEmail(email == undefined
                        ? email = ""
                        : email.toString());
    this.createUserPasswordUpdateForm();
  }

  getUserByEmail(email:string) {
    this.userService.getUserByEmail(email).subscribe(response => {
      this.user = response.data;

    })
  }

  createUserPasswordUpdateForm(){
    this.userPasswordUpdateForm=this.formBuilder.group({
      id:["",Validators.required],
      currentPassword:["",Validators.required],
      newPassword:["",Validators.required],
    })
  }

  updateUserPassword(){
    this.userPasswordUpdateForm.patchValue({ id: this.user.id })
    if(this.userPasswordUpdateForm.valid){
      let updatePasswordModel=Object.assign({},this.userPasswordUpdateForm.value);

      this.authService.updateUserPassword(updatePasswordModel).subscribe(
        (response)=>{
          this.toastrService.success(response.message,"Başarılı")
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
      (responseError)=>{
        console.log(responseError);
        if(responseError.error.ValidationErrors.lengh>0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatası");
          }
        }
      }
      );
    }
    else{
      this.toastrService.error("Formunuz eksiktir. Kontrol ediniz.","Dikkat");
    }
}
}