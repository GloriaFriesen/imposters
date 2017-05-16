import { Pipe, PipeTransform } from '@angular/core';
import { Post } from './post.model';

@Pipe({
  name: 'category',
  pure: false

})
export class CategoryPipe implements PipeTransform {

  transform(input: Post[], desiredCategory) {
    

  }

}
