import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publisher } from '../models/entities/publisher';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  apiUrl = "https://localhost:44337/api/publishers";

  constructor(private httpClient:HttpClient) { }

  getPublishers():Observable<ListResponseModel<Publisher>>{
    let newPath = this.apiUrl + "/getall";
    return this.httpClient.get<ListResponseModel<Publisher>>(newPath);
  }

  getPublisherById(publisherId:number):Observable<SingleResponseModel<Publisher>> {
    return this.httpClient.get<SingleResponseModel<Publisher>>(this.apiUrl +"/getbyid?authorId"+publisherId);
  }

  addPublisher(publisher:Publisher):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/add", publisher);
  }

  deletePublisher(publisher:Publisher):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/delete", publisher);
  }

  updatePublisher(publisher:Publisher):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/update", publisher);
  }
}
