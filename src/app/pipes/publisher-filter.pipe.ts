import { Pipe, PipeTransform } from '@angular/core';
import { Publisher } from '../models/entities/publisher';

@Pipe({
  name: 'publisherFilter'
})
export class PublisherFilterPipe implements PipeTransform {

  transform(value: Publisher[], filterText:string): Publisher[] {
    filterText=filterText?filterText.toLocaleLowerCase():"";

    return filterText?value.filter((p:Publisher)=>p.publisherName
                                  .toLocaleLowerCase()
                                  .indexOf(filterText)!==-1):value;
  }

}
