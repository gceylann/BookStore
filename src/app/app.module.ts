import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { CategoryComponent } from './components/category/category.component';
import { NaviComponent } from './components/navi/navi.component';
import { BookFilterPipe } from './pipes/book-filter.pipe';
import { AuthorFilterPipe } from './pipes/author-filter.pipe';
import { PublisherFilterPipe } from './pipes/publisher-filter.pipe';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { BookFilterComponent } from './components/book-filter/book-filter.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookAddComponent } from './components/book-add/book-add.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookUpdateComponent } from './components/book-update/book-update.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { CategoryUpdateComponent } from './components/category-update/category-update.component';
import { PublisherListComponent } from './components/publisher-list/publisher-list.component';
import { AuthorUpdateComponent } from './components/author-update/author-update.component';
import { PublisherUpdateComponent } from './components/publisher-update/publisher-update.component';
import { PublisherAddComponent } from './components/publisher-add/publisher-add.component';
import { AuthorAddComponent } from './components/author-add/author-add.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserPasswordUpdateComponent } from './components/user-password-update/user-password-update.component';
import { CategoryFilterPipe } from './pipes/category-filter.pipe';
import { AuthorComponent } from './components/author/author.component';
import { PublisherComponent } from './components/publisher/publisher.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { PaymentComponent } from './components/payment/payment.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CartDetailComponent } from './components/cart-detail/cart-detail.component';
import { UserInfosUpdateComponent } from './components/user-infos-update/user-infos-update.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    CategoryComponent,
    NaviComponent,
    BookFilterPipe,
    AuthorFilterPipe,
    PublisherFilterPipe,
    CartSummaryComponent,
    BookFilterComponent,
    BookDetailComponent,
    BookAddComponent,
    BookListComponent,
    BookUpdateComponent,
    AuthorListComponent,
    CategoryUpdateComponent,
    PublisherListComponent,
    AuthorUpdateComponent,
    PublisherUpdateComponent,
    PublisherAddComponent,
    AuthorAddComponent,
    CategoryAddComponent,
    LoginComponent,
    RegisterComponent,
    UserPasswordUpdateComponent,
    CategoryFilterPipe,
    AuthorComponent,
    PublisherComponent,
    FilterPipePipe,
    PaymentComponent,
    CategoryListComponent,
    CartDetailComponent,
    UserInfosUpdateComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({positionClass:"toast-bottom-right"})
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
