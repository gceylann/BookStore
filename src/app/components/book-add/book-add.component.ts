import { NullTemplateVisitor } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/models/entities/author';
import { Category } from 'src/app/models/entities/category';
import { Publisher } from 'src/app/models/entities/publisher';
import { AuthorService } from 'src/app/services/author.service';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';
import { PublisherService } from 'src/app/services/publisher.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent implements OnInit {

  bookAddForm:FormGroup;
  categories:Category[];
  authors:Author[];
  publishers:Publisher[];
  author:Author;
  publisher:Publisher;
  category:Category;

  constructor(private bookService:BookService,
              private formBuilder:FormBuilder,
              private toastrService:ToastrService,
              private categoryService:CategoryService,
              private authorService:AuthorService,
              private publisherService:PublisherService) { }

  ngOnInit(): void {
    this.createBookAddForm();
    this.getAuthors();
    this.getCategories();
    this.getPublishers();
  }

  createBookAddForm(){
    this.bookAddForm=this.formBuilder.group({
      categoryId:["",Validators.required],
      authorId:["",Validators.required],
      publisherId:["",Validators.required],
      bookName:["",Validators.required],
      page:["",Validators.required],
      price:["",Validators.required],
      description:["",Validators.required],
    })
  }

  addBook(){
    if (this.bookAddForm.valid) {
      let bookModel= Object.assign({},this.bookAddForm.value);
      this.bookService.addBook(bookModel).subscribe(
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

  getAuthorById(authorId:number){
    this.authorService.getAuthorById(authorId).subscribe(response=>{
      this.author=response.data;

      this.bookAddForm.get("authorId")?.setValue(this.author.authorId);
      this.bookAddForm.get("authorName")?.setValue(this.author.authorName);
    })
  }

  getPublisherById(authorId:number){
    this.publisherService.getPublisherById(authorId).subscribe(response=>{
      this.publisher=response.data;

      this.bookAddForm.get("publisherId")?.setValue(this.publisher.publisherId);
      this.bookAddForm.get("publisherName")?.setValue(this.publisher.publisherName);
    })
  }

  getCategoryById(categoryId:number){
    this.categoryService.getCategoryById(categoryId).subscribe(response=>{
      this.category=response.data;

      this.bookAddForm.get("categoryId")?.setValue(this.category.categoryId);
      this.bookAddForm.get("categoryName")?.setValue(this.category.categoryName);
    })
  }
}

