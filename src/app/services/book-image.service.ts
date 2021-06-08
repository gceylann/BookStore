import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookImage } from '../models/entities/bookImage';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class BookImageService {

  apiUrl = "https://localhost:44337/api/bookImages";

  constructor(private httpClient:HttpClient) { }

  getBookImageById(imageId:number):Observable<ListResponseModel<BookImage>> {
    let newPath = this.apiUrl + "/getbyid?bookId="+imageId;
    return this.httpClient.get<ListResponseModel<BookImage>>(newPath);
  }
}
