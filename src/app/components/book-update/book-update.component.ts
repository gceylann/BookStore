import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/models/entities/author';
import { Book } from 'src/app/models/entities/book';
import { Category } from 'src/app/models/entities/category';
import { Publisher } from 'src/app/models/entities/publisher';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';
import { PublisherService } from 'src/app/services/publisher.service';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.css']
})
export class BookUpdateComponent implements OnInit {

  bookUpdateForm:FormGroup;
  categories:Category[];
  authors:Author[];
  publishers:Publisher[];
  book:Book;
 
  constructor(private bookService:BookService,
              private formBuilder:FormBuilder,
              private toastrService:ToastrService,
              private activatedRoute:ActivatedRoute,
              private categoryService:CategoryService,
              private authorService:AuthorService,
              private publisherService:PublisherService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((response)=> {
      if (response["bookId"]) {
        this.getBookById(response["bookId"]);
        this.getCategories();
        this.getAuthors();
        this.getPublishers();
        this.createBookUpdateForm();
      }
    });
  }

  createBookUpdateForm(){
    this.bookUpdateForm=this.formBuilder.group({
      bookId:["",Validators.required],
      categoryId:["",Validators.required],
      authorId:["",Validators.required],
      publisherId:["",Validators.required],
      bookName:["",Validators.required],
      page:["",Validators.required],
      price:["",Validators.required],
      description:["",Validators.required],
    })
  }

  updateBook(){
    this.bookUpdateForm.patchValue({ bookId: this.book.bookId})
    if (this.bookUpdateForm.valid) {
      let bookModel= Object.assign({},this.bookUpdateForm.value);
      this.bookService.updateBook(bookModel).subscribe(
        response => {
          this.toastrService.success(response.message,"Başarılı")
        },
        responseError => {
          if (responseError.error.ValidationError.length>0) {
            for (let i = 0; i < responseError.error.ValidationError.length; i++) {
              this.toastrService.error(responseError.error.ValidationError[i].ErrorMessage,"Doğrulama Hatası")
              
            }
          }
        }
      )
    } else {
      this.toastrService.error("Eksik form!","Lütfen boş alan bırakmayınız")
    }
  }

   getBookById(bookId:number){
    this.bookService.getBookById(bookId).subscribe(response=>{
      this.book=response.data;

      this.bookUpdateForm.get("bookId")?.setValue(this.book.bookId);
      this.bookUpdateForm.get("bookName")?.setValue(this.book.bookName);
      this.bookUpdateForm.get("categoryId")?.setValue(this.book.categoryId);
      this.bookUpdateForm.get("authorId")?.setValue(this.book.authorId);
      this.bookUpdateForm.get("publisherId")?.setValue(this.book.publisherId);
      this.bookUpdateForm.get("page")?.setValue(this.book.page);
      this.bookUpdateForm.get("price")?.setValue(this.book.price);
      this.bookUpdateForm.get("description")?.setValue(this.book.description);
    })
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(response=>{
      this.categories=response.data;
    })
  }

  getAuthors(){
    this.authorService.getAuthors().subscribe(response=>{
      this.authors=response.data;
    })
  }

  getPublishers(){
    this.publisherService.getPublishers().subscribe(response=>{
      this.publishers=response.data;
    })
  }
}
