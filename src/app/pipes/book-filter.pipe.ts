import { Pipe, PipeTransform } from '@angular/core';
import { BookDetail } from '../models/entities/bookDetail';

@Pipe({
  name: 'bookFilter'
})
export class BookFilterPipe implements PipeTransform {

  transform(value: BookDetail[], filterText:string): BookDetail[] {
    filterText= filterText?filterText.toLocaleLowerCase():"";

    return filterText?value.filter((b:BookDetail)=>b.bookName
                                                 .toLocaleLowerCase()
                                                 .indexOf(filterText)!==-1):value;
  }

}
