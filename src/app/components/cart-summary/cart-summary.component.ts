import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/entities/book';
import { BookDetail } from 'src/app/models/entities/bookDetail';
import { CartItem } from 'src/app/models/entities/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.css']
})
export class CartSummaryComponent implements OnInit {

  cartItems:CartItem[];

  constructor(private cartService:CartService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.cartItems=this.cartService.list();
  }

  removeFromCart(book:BookDetail){
    this.cartService.removeFromCart(book);
    this.toastrService.error(book.bookName , "Sepetten Silindi!");
  }
}
