import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/models/entities/author';
import { AuthorService } from 'src/app/services/author.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-author-update',
  templateUrl: './author-update.component.html',
  styleUrls: ['./author-update.component.css']
})
export class AuthorUpdateComponent implements OnInit {
 
  authors:Author[];
  author:Author;
  authorUpdateForm:FormGroup;

  
  constructor(private authorService:AuthorService,
              private toastrService:ToastrService,
              private formBuilder:FormBuilder,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
   this.activatedRoute.params.subscribe(params=>{
     if (params["authorId"]) {
       this.getAuthorById(params["authorId"]);
       this.createAuthorUpdateForm();  
       this.getAuthors();
     }
   })
  }

  createAuthorUpdateForm(){
    this.authorUpdateForm=this.formBuilder.group({
      authorId:["",Validators.required],
      authorName:["",Validators.required]
    })
  }

  updateAuthor(){
    if(this.authorUpdateForm.valid){
      let updateAuthorModel=Object.assign({},this.authorUpdateForm.value);

      console.log(updateAuthorModel);

      this.authorService.updateAuthor(updateAuthorModel).subscribe(
        (response)=>{
          this.toastrService.success(response.message,"Başarılı")
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
      (responseError)=>{
        console.log(responseError);
        if(responseError.error.ValidationErrors.lengh>0){
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama Hatası");
          }
        }
      }
      );
    }
    else{
      this.toastrService.error("Formunuz eksiktir. Kontrol ediniz.","Dikkat");
    }
  }

  getAuthorById(authorId:number){
    this.authorService.getAuthorById(authorId).subscribe(response=>{
      this.author=response.data;

      this.authorUpdateForm.get("authorId")?.setValue(this.author.authorId);
      this.authorUpdateForm.get("authorName")?.setValue(this.author.authorName);
    })
  }

  getAuthors(){
    this.authorService.getAuthors().subscribe(response=>{
      this.authors=response.data;
    })
  }

}
