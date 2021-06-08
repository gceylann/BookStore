import { Injectable } from '@angular/core';
import { BookDetailComponent } from '../components/book-detail/book-detail.component';
import { Book } from '../models/entities/book';
import { BookDetail } from '../models/entities/bookDetail';
import { CartItem } from '../models/entities/cart-item';
import { CartItems } from '../models/entities/cart-items';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(book:BookDetail){
    let item=CartItems.find(b=>b.book.bookId===book.bookId);
    if (item) {
      item.quantity+=1
    } else {
      let cartItem=new CartItem();
      cartItem.book=book;
      cartItem.quantity=1;
      CartItems.push(cartItem)
    }
  }
  removeFromCart(book:BookDetail){
    let item:CartItem = CartItems.find(c=>c.book.bookId===book.bookId);
    CartItems.splice(CartItems.indexOf(item),1);
  }

  list():CartItem[]{
    return CartItems;
  }
}
