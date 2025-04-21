import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
    transform(value: string): string {
        const timeStamp = Date.parse(value);
        if (isNaN(timeStamp)) {
            console.error("Invalid date format.")
            return "";
        }

        const date = new Date(timeStamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }
}
