import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { BookAddComponent } from './components/book-add/book-add.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserPasswordUpdateComponent } from './components/user-password-update/user-password-update.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { PublisherListComponent } from './components/publisher-list/publisher-list.component';
import { AuthorAddComponent } from './components/author-add/author-add.component';
import { PublisherAddComponent } from './components/publisher-add/publisher-add.component';
import { AuthorUpdateComponent } from './components/author-update/author-update.component';
import { PublisherUpdateComponent } from './components/publisher-update/publisher-update.component';
import { BookUpdateComponent } from './components/book-update/book-update.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryUpdateComponent } from './components/category-update/category-update.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { PaymentComponent } from './components/payment/payment.component';
import { LoginGuard } from './guards/login.guard';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { UserInfosUpdateComponent } from './components/user-infos-update/user-infos-update.component';


const routes: Routes = [   
  {path:"",pathMatch:"full",component:BookComponent},
  {path:"books",component:BookComponent},
  {path:"books/bookdetail/:bookId",component:BookDetailComponent},
  
  {path: "booklist", component: BookListComponent},
  {path: "categorylist", component: CategoryListComponent},
  {path: "authorlist", component: AuthorListComponent},
  {path: "publisherlist", component: PublisherListComponent},

  {path: "books/add",component: BookAddComponent},
  {path: "categories/add", component: CategoryAddComponent},
  {path: "authors/add", component: AuthorAddComponent},
  {path: "publishers/add", component: PublisherAddComponent},

  {path: "books/update/:bookId", component: BookUpdateComponent},
  {path: "categories/update/:categoryId", component: CategoryUpdateComponent},
  {path: "authors/update/:authorId", component: AuthorUpdateComponent},
  {path: "publishers/update/:publisherId", component: PublisherUpdateComponent},   
  
  {path: "login", component:LoginComponent},
  {path: "register", component:RegisterComponent},
  {path: "updatepassword", component:UserPasswordUpdateComponent, canActivate: [LoginGuard]},
  {path: "updateinfos", component:UserInfosUpdateComponent, canActivate: [LoginGuard]},

  {path: 'payments', component: PaymentComponent },
  {path: 'cart', component: CartDetailComponent },

  {path: "books/category/:categoryId", component: BookComponent},
  {path: "books/author/:authorId", component: BookComponent},
  {path: "books/filter/:categoryId/:authorId", component: BookComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


