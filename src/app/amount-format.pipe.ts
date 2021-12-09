import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'amountFormat'
})
export class AmountFormatPipe implements PipeTransform {
	transform(value: any): any {
		if (value !== null && value !== undefined && value !== 0) {
			value = value.toFixed(2);
			let x = value.toString();
			let afterPoint = '';

			if (x.indexOf('.') > 0) afterPoint = x.substring(x.indexOf('.'), x.length);
			x = Math.floor(x);
			x = x.toString();
			let lastThree = x.substring(x.length - 3);
			let otherNumbers = x.substring(0, x.length - 3);
			if (otherNumbers && otherNumbers !="-"  && otherNumbers != '') lastThree = ',' + lastThree;
			let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree + afterPoint;

			return res;
		} else {
			return 0;
		}
	}
}
