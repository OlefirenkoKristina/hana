import { Pipe, PipeTransform } from '@angular/core';

const formatter = new Intl.NumberFormat('uk-UA', { maximumFractionDigits: 0 });

/** 1200 → «1 200 грн» */
@Pipe({ name: 'uah' })
export class UahPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    return `${formatter.format(value ?? 0)} грн`;
  }
}
