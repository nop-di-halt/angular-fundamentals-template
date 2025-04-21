import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class AppValidators {
    static get email(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (!control.value || /^(([^<>()[\]\\.,;:\s@"]+(\.[^ <>()[\]\\., ;: \s @"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value)) {
                return null;
            }
            return { "valid": { "message": `${control.value} not a valid email` } };
        }
    }
}