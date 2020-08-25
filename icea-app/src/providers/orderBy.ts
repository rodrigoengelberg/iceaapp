import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderBy implements PipeTransform {

  transform(value: Array<any>, ...args) {
    if (value && args[0]) {
      let type = args[1] ? args[1] : 'asc';
      let key = args[0];

      let ordered = value.sort((a: any, b: any) => {
        if (a[key] > b[key] && type === 'asc') {
          return 1;
        }
        else if (a[key] > b[key] && type === 'desc') {
          return -1;
        }
        else if (a[key] < b[key] && type === 'asc') {
          return -1;
        }
        else if (a[key] < b[key] && type === 'desc') {
          return 1;
        }
        else {
          return 0;
        }
      });

      console.log(ordered);

      return ordered;
    }

    return value;
  }
}
