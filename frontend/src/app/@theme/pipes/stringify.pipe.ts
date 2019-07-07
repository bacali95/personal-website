import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'stringify'})
export class StringifyPipe implements PipeTransform {

  transform(input: any): string {
    return JSON.stringify(input);
  }
}
