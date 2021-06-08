import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfos } from '../models/auth/user-infos';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44337/api/users";

  constructor(private httpClient:HttpClient) { }

  getUserByEmail(email:string):Observable<SingleResponseModel<UserInfos>> {
    return this.httpClient.get<SingleResponseModel<UserInfos>>(this.apiUrl + "/getbyemail?email=" + email);
  }

  getUsers():Observable<ListResponseModel<UserInfos>>{
    return this.httpClient.get<ListResponseModel<UserInfos>>(this.apiUrl + "/getall");
  }
  
  getUserById(userId:number):Observable<SingleResponseModel<UserInfos>> {
    return this.httpClient.get<SingleResponseModel<UserInfos>>(this.apiUrl + "/getbyid" + userId);
  }

  updateUserInfos(user:UserInfos):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "/update", user)
  }
  
}
