import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/auth/login-model';
import { RegisterModel } from '../models/auth/register-model';
import { TokenModel } from '../models/auth/token-model';
import { UserPasswordChangingModel } from '../models/auth/user-password-changing';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44337/api/auth/";

  constructor(private httpClient:HttpClient,
              private localStorage:LocalStorageService) { }


  register(registerModel:RegisterModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + "register", registerModel)
  } 

  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",loginModel)
  }

  logout(){
    this.localStorage.remove("token")
    return true;
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }

  updateUserPassword(userPasswordChangingModel:UserPasswordChangingModel){
    return this.httpClient.post<ResponseModel>(this.apiUrl + "changepassword", userPasswordChangingModel)
  }

}

