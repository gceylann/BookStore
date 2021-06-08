import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/entities/book';
import { BookDetail } from 'src/app/models/entities/bookDetail';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  bookDetails:BookDetail[]=[];
  filterText="";
  bookId:number;

  constructor(private bookService:BookService,
              private activatedRoute:ActivatedRoute,
              private cartService:CartService,
              private toastrService:ToastrService,
              private localStorageService:LocalStorageService,
              private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["categoryId"]){
        this.getBooksByCategory(params["categoryId"])
        }  
     else if (params["authorId"]) {
       this.getBooksByAuthor(params["authorId"])
     }   
     else if(params["categoryId"] && params["categoryId"]){
      this.getBooksByCategoryAndAuthor(params["categoryId"],params["authorId"])
    }  
     else{
     this.getBookDetails()
     }
    })

  }

  getBookDetails(){
    this.bookService.getBookDetails().subscribe(response=>{
      this.bookDetails=response.data
    })
  }


  getBooksByCategory(categoryId:number) {
    this.bookService.getBooksByCategory(categoryId).subscribe(response=>{
      this.bookDetails = response.data
    })   
  }

  getBooksByAuthor(authorId:number) {
    this.bookService.getBooksByCategory(authorId).subscribe(response=>{
      this.bookDetails = response.data
    })   
  }

  getBooksByCategoryAndAuthor(categoryId:number,authorId:number) {
    this.bookService.getBooksByCategoryAndAuthor(categoryId,authorId).subscribe(response=>{
      this.bookDetails=response.data;
    });
  }
 
  addToCart(book:BookDetail){
    if (book) {
      this.cartService.addToCart(book);
      this.toastrService.success(book.bookName, " Sepete Eklendi.")

    } else {
      this.toastrService.error("Sepete eklenemedi! Lütfen tekrar deneyin")
    }
  }

}


