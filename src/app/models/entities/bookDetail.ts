import { BookImage } from "./bookImage";

export interface BookDetail{
    bookId:number;
    categoryName:string;
    bookName:string;
    page:number;
    price:number;
    authorName:string;
    publisherName:string;
    description:string;
    imagePath:string;
}