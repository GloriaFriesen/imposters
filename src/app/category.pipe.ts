import { Pipe, PipeTransform } from '@angular/core';
import { Post } from './post.model';

@Pipe({
  name: 'category',
  pure: false

})
export class CategoryPipe implements PipeTransform {

  transform(input: Post[], desiredCategory) {
    var output: Post[] = [];
    if (desiredCategory === 'All Solutions' || desiredCategory === null || input === null) {
        return input;
    }  else {
        for (var i = 0; i < input.length; i++) {
          if (input[i].category.toLowerCase() === desiredCategory.toLowerCase()) {
              output.push(input[i]);}
      } return output;
    }

  }

}
