import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  categoryAddForm:FormGroup;


  constructor(private categoryService:CategoryService,
              private formBuilder:FormBuilder,
              private toastrService:ToastrService,
              ) { }

  ngOnInit(): void {
    this.createCategoryAddForm();
  }

  createCategoryAddForm(){
    this.categoryAddForm=this.formBuilder.group({
      categoryName:["",Validators.required]
    })
  }

  addCategory(){
    if (this.categoryAddForm.valid) {
      let categoryModel= Object.assign({},this.categoryAddForm.value);
      this.categoryService.addCategory(categoryModel).subscribe(
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
