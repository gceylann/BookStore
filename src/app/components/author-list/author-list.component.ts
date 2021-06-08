import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/models/entities/author';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {

  authors:Author[];

  constructor(private authorService:AuthorService,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getAuthors();
  }

  getAuthors(){
    this.authorService.getAuthors().subscribe((response) => {
      this.authors=response.data;
    })
  }

  deleteAuthor(author:Author){
    this.authorService.deleteAuthor(author).subscribe((response) => {
      this.toastrService.error("Bu Yazar Silindi");
      setTimeout(()=> {window.location.reload();},1500);
    })
  }
}