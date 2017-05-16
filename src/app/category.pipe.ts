import { Pipe, PipeTransform } from '@angular/core';
import { Post } from './post.model';

@Pipe({
  name: 'category',
  pure: false

})
export class CategoryPipe implements PipeTransform {

  transform(input: Post[], desiredCategory) {
    var output: Post[] = [];
      if(desiredCategory === "Code Snippet") {
        for(var i = 0; i < input.length; i++) {
          if(input[i].category === "Code Snippet") {
            output.push(input[i]);
          }
        }
        return output;
      } else if (desiredCategory === "Job Tip") {
        for(var i = 0; i < input.length; i++) {
          if(input[i].category === "Job Tip") {
            output.push(input[i]);
          }
        }
        return output;
      } else if (desiredCategory === "Cool Tech") {
        for(var i = 0; i < input.length; i++) {
          if(input[i].category === "Cool Tech") {
            output.push(input[i]);
          }
        }
        return output;
      } else {
        return input;
      }
  }

}
