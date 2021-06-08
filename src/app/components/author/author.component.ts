import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/entities/author';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})   
export class AuthorComponent implements OnInit {

  authors:Author[]=[];
  currentAuthor: Author;


  constructor(private authorService:AuthorService) { }

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors() {
    this.authorService.getAuthors().subscribe(response=> {
      this.authors=response.data
    })
  }
  setCurrentAuthor(author:Author){
    this.currentAuthor=author;

  }

  getCurrentAuthorClass(author:Author){
    if (author==this.currentAuthor) {
      return "list-group-item active list-group-item-dark"
    }else{
      return "list-group-item"
    }
  }

}
