import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from "../models/singleResponseModel";
import { Book } from '../models/entities/book';
import { BookDetail } from '../models/entities/bookDetail';



@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiUrl = "https://localhost:44337/api/books";

  constructor(private httpClient:HttpClient) { }

  getBooks():Observable<ListResponseModel<Book>> {
    let newPath = this.apiUrl + "/getall";
    return this.httpClient.get<ListResponseModel<Book>>(newPath);
  }

  getBookById(bookId:number):Observable<SingleResponseModel<Book>> {
    let newPath = this.apiUrl + "/getbyid?bookId="+bookId;
    return this.httpClient.get<SingleResponseModel<Book>>(newPath);
  }

  getBooksByCategory(categoryId:number):Observable<ListResponseModel<BookDetail>> {
    let newPath = this.apiUrl + "/getbooksbycategory?categoryId="+categoryId;
    return this.httpClient.get<ListResponseModel<BookDetail>>(newPath);
  }

  getBooksByAuthor(authorId:number):Observable<ListResponseModel<BookDetail>>{
    let newPath = this.apiUrl + "/getbooksbyauthor?authorId="+authorId;
    return this.httpClient.get<ListResponseModel<BookDetail>>(newPath);
  }

  getBooksByPublisher(publisherId:number):Observable<ListResponseModel<BookDetail>>{
    let newPath = this.apiUrl + "/getbooksbypublisher?publisherId="+publisherId;
    return this.httpClient.get<ListResponseModel<BookDetail>>(newPath);
  }

  getBooksByCategoryAndAuthor(categoryId:number,authorId:number):Observable<ListResponseModel<BookDetail>> {
    let newPath = this.apiUrl + "/getbooksbyfilter?categoryId="+categoryId+"&authorId="+authorId
    return this.httpClient.get<ListResponseModel<BookDetail>>(newPath);
  }

  getBookDetails():Observable<ListResponseModel<BookDetail>>{
    let newPath = this.apiUrl + "/getbookdetails";
    return this.httpClient.get<ListResponseModel<BookDetail>>(newPath);
  }

  getBooksById(bookId:number):Observable<ListResponseModel<BookDetail>> {
    let newPath = this.apiUrl + "/getbookdetails?bookId="+bookId;
    return this.httpClient.get<ListResponseModel<BookDetail>>(newPath);
  }

  
  addBook(book:BookDetail):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/add", book);
  }

  deleteBook(book:BookDetail):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/delete", book);
  }

  updateBook(book:Book):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"/update", book);
  }
}


