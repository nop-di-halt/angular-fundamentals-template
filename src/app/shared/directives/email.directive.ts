import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { AppValidators } from "../helpers/appValidators";

@Directive({
    selector: '[emailValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: EmailValidatorDirective,
        multi: true,
    }]
})
export class EmailValidatorDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        return AppValidators.email(control);
    }
}
