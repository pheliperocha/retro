import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeIntersection',
  pure: false
})
export class RemoveIntersectionPipe implements PipeTransform {
  transform(arr: Array<any>, remove: Array<any>): any {
    let newArr;

    if (arr !== undefined) {
      newArr = arr.filter(function (item) {

        let i;
        for (i = 0; i < remove.length; i++) {
          if (remove[i].id === item.id) {
            return false;
          }
        }

        return true;
      });
    }

    return newArr;
  }
}
