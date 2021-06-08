import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/entities/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories:Category[];

  constructor(private categoryService:CategoryService,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((response) => {
      this.categories=response.data;
    })
  }

  deleteCategory(category:Category){
    this.categoryService.deleteCategory(category).subscribe((response) => {
      this.toastrService.error("Bu Kategori Silindi");
      setTimeout(()=> {window.location.reload();},1500);
    })
  }
}
