import { Pipe, PipeTransform } from '@angular/core';
import { Profile } from './profile.model';

@Pipe({
  name: 'searchProfiles',
  pure: false
})
export class SearchProfilesPipe implements PipeTransform {

  transform(users: any, term: any): any {
    if (term === undefined){
      return users;
    } else {
      return users.filter(function(users){
        return users.displayName.toLowerCase().includes(term.toLowerCase());
      })
    }
  }

}
