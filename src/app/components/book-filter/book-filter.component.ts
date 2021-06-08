import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from 'src/app/models/entities/author';
import { Category } from 'src/app/models/entities/category';
import { AuthorService } from 'src/app/services/author.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.css']
})
export class BookFilterComponent implements OnInit {

  categories:Category[];
  authors:Author[];
  authorIdFilter:number;
  categoryIdFilter:number;
  currentCategory: Category;
  currentAuthor: Author;

  constructor(private authorService:AuthorService,
              private categoryService:CategoryService,
              private router:Router) { }

  ngOnInit(): void {
    this.getAuthors();
    this.getCategories();
  }

  getAuthors(){
    this.authorService.getAuthors().subscribe((response)=> {
      this.authors=response.data;
    });
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((response)=> {
      this.categories=response.data;
    });
  }

  getSelectedAuthor(author:Author){
    if (this.currentAuthor=== author) {
      return true;
    } else {
      return false;
    }
  }

  getSelectedCategory(category:Category){
    if (this.currentCategory=== category) {
      return true;
    } else {
      return false;
    }
  }

  applyFilter() {
    if(this.categoryIdFilter != null && this.authorIdFilter != null) {
      this.router.navigate(['/books/filter/' + this.categoryIdFilter + "/" + this.authorIdFilter])
    }
    else if(this.categoryIdFilter != null) {
      this.router.navigate(['/books/category/' + this.categoryIdFilter])
    }
    else if(this.authorIdFilter != null) {
      this.router.navigate(['/books/author/' + this.authorIdFilter])
    }
  }

  clearFilter() {
    this.router.navigate(['/books'])
  }


}
