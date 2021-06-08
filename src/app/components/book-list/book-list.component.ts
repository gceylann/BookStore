import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from 'src/app/models/entities/book';
import { BookDetail } from 'src/app/models/entities/bookDetail';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books:BookDetail[]=[];

  constructor(private bookService:BookService,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getBooks();
    
  }

  getBooks(){
    this.bookService.getBookDetails().subscribe((response) => {
      this.books=response.data;
    }) 
  }

  deleteBook(book:BookDetail){
    this.bookService.deleteBook(book).subscribe((response) => {
      this.toastrService.error("Kitap Silindi");
      setTimeout(()=> {window.location.reload();},1500);
    })
  }
}
