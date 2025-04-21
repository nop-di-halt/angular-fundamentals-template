import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    transform(value: number = 0): string {
        const format = new Intl.NumberFormat('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        return `${format.format(hours)}:${format.format(minutes)}`;
    }
}
