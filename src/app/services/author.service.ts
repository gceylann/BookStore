import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { Author } from '../models/entities/author';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  apiUrl = "https://localhost:44337/api/authors";

  constructor(private httpClient:HttpClient) { }

  getAuthors():Observable<ListResponseModel<Author>>{
    let newPath = this.apiUrl + "/getall";
    return this.httpClient.get<ListResponseModel<Author>>(newPath);
  }

  getAuthorById(authorId:number):Observable<SingleResponseModel<Author>> {
    return this.httpClient.get<SingleResponseModel<Author>>(this.apiUrl +"/getbyid?authorId"+authorId);
  }

  addAuthor(author:Author):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/add", author);
  }

  deleteAuthor(author:Author):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/delete", author);
  }

  updateAuthor(author:Author):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/update", author);
  }
}
