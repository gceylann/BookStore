import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '../models/entities/author';

@Pipe({
  name: 'authorFilter'
})
export class AuthorFilterPipe implements PipeTransform {

  transform(value: Author[], filterText:string): Author[] {
    filterText= filterText?filterText.toLocaleLowerCase():"";

    return filterText?value.filter((a:Author)=>a.authorName
                                                 .toLocaleLowerCase()
                                                 .indexOf(filterText)!==-1):value;
  }

}
