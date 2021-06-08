import { Pipe, PipeTransform } from '@angular/core';
import { BookDetail } from '../models/entities/bookDetail';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: BookDetail[], filterText:string): BookDetail[] {
    filterText = filterText? filterText.toLocaleLowerCase() : "";

    return filterText? value.filter((b:BookDetail)=>
    b.description.toLocaleLowerCase().indexOf(filterText)!==-1 ||
    b.categoryName.toLocaleLowerCase().indexOf(filterText)!==-1 || 
    b.authorName.toLocaleLowerCase().indexOf(filterText)!==-1 ):value;
  }

}
