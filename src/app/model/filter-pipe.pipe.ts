import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipePipe implements PipeTransform {

  transform(value: any, searchEvent:any): any {
    
    
    // console.log(value.filter((e:any) => {
    //   return e.title.toLowerCase().indexOf(searchEvent) > -1;
    // }));
    
    return value.filter((e:any) => {
      return e.title.toLowerCase().indexOf(searchEvent) > -1;
    });
  }

}
