import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserInfos } from 'src/app/models/auth/user-infos';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-infos-update',
  templateUrl: './user-infos-update.component.html',
  styleUrls: ['./user-infos-update.component.css']
})
export class UserInfosUpdateComponent implements OnInit {

  user:UserInfos;
  userInfosUpdateForm:FormGroup;

  constructor(private userService:UserService,
              private toastrService:ToastrService,
              private formBuilder:FormBuilder,
              private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    let email = this.localStorage.get("email");
      this.getUserByEmail(email == undefined
                          ? email = ""
                          : email.toString());
      this.createUserInfosUpdateForm();
  }

  getUserByEmail(email:string){
    this.userService.getUserByEmail(email).subscribe(response=>{
      this.user=response.data;

      this.userInfosUpdateForm.get("id")?.setValue(this.user.id);
      this.userInfosUpdateForm.get("firstName")?.setValue(this.user.firstName);
      this.userInfosUpdateForm.get("lastName")?.setValue(this.user.lastName);
      this.userInfosUpdateForm.get("email")?.setValue(this.user.email);
    })
  }

  createUserInfosUpdateForm(){
    this.userInfosUpdateForm=this.formBuilder.group({
      id:[{},Validators.required],
      firstName:[{},Validators.required],
      lastName:[{},Validators.required],
      email:[{},Validators.required],
    })
  }

  updateUserInfos(){
    this.userInfosUpdateForm.patchValue({id:this.user.id})
    if(this.userInfosUpdateForm.valid){
      let updateUserInfosModel=Object.assign({},this.userInfosUpdateForm.value);

      this.userService.updateUserInfos(updateUserInfosModel).subscribe(
        (response)=>{
          this.toastrService.success(response.message,"Başarılı")
          this.localStorage.set("email", this.userInfosUpdateForm.get("email")?.value)
        setTimeout(() => { window.location.reload(); }, 1000);
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
