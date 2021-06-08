import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author-add',
  templateUrl: './author-add.component.html',
  styleUrls: ['./author-add.component.css']
})
export class AuthorAddComponent implements OnInit {

  authorAddForm:FormGroup;


  constructor(private authorService:AuthorService,
              private formBuilder:FormBuilder,
              private toastrService:ToastrService,
              ) { }

  ngOnInit(): void {
    this.createAuthorAddForm();
  }

  createAuthorAddForm(){
    this.authorAddForm=this.formBuilder.group({
      authorName:["",Validators.required]
    })
  }

  addAuthor(){
    if (this.authorAddForm.valid) {
      let authorModel= Object.assign({},this.authorAddForm.value);
      this.authorService.addAuthor(authorModel).subscribe(
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
}
