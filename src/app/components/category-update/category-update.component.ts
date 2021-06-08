import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/entities/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {

  category:Category;
  categories:Category[];
  categoryUpdateForm:FormGroup;

  
  constructor(private categoryService:CategoryService,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute) { }


  ngOnInit(): void {
   this.activatedRoute.params.subscribe(params=>{
      if (params["categoryId"]) {
        this.getCategoryById(params["categoryId"]);
        this.createCategoryUpdateForm();
        this.getCategories();
     }
   })
  }

  createCategoryUpdateForm(){
    this.categoryUpdateForm=this.formBuilder.group({
      categoryId:["",Validators.required],
      categoryName:["",Validators.required]
    })
  }

  updateCategory(){
    if(this.categoryUpdateForm.valid){
      let updateCategoryModel=Object.assign({},this.categoryUpdateForm.value);

      console.log(updateCategoryModel);

      this.categoryService.updateCategory(updateCategoryModel).subscribe(
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

  getCategoryById(categoryId:number){
    this.categoryService.getCategoryById(categoryId).subscribe(response=>{
      this.category=response.data;

      this.categoryUpdateForm.get("categoryId")?.setValue(this.category.categoryId);
      this.categoryUpdateForm.get("categoryName")?.setValue(this.category.categoryName);
    })
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(response=>{
      this.categories=response.data;
    })
  }
}