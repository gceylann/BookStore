import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserInfos } from 'src/app/models/auth/user-infos';
import { BookDetail } from 'src/app/models/entities/bookDetail';
import { Order } from 'src/app/models/entities/order';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  bookDetails:BookDetail;
  orders:Order[];
  ordersByBookId:Order[];
  users:UserInfos[];
  userDetail:UserInfos;
  orderModel:Order;

  constructor(private bookService:BookService,
              private toastrService:ToastrService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private orderService:OrderService,
              private localStorage:LocalStorageService,
              private cartService:CartService,
              private userService:UserService,
              ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["bookId"]){
        this.getBookDetails(params["bookId"]);
      }
    });
  }

  getBookDetails(bookId:number){
    this.bookService.getBooksById(bookId).subscribe(response=>{
      this.bookDetails=response.data[bookId];
    
    })
  }

  getOrders(){
    this.orderService.getOrders().subscribe(response=>{
      this.orders=response.data;
    })
  }

  getOrderByBookId(id:number){
    this.orderService.getOrder(id).subscribe(response=>{
      this.ordersByBookId=response.data;
    })
  }

  getUser(){
    this.userService.getUsers().subscribe(response=>{
      this.users=response.data;
    })

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