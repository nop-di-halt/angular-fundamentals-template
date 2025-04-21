import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppValidators } from '@app/shared/helpers/appValidators';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  submitted = false;

  registrationForm: FormGroup = new FormGroup({
    name: new FormControl({ value: "", disabled: false }, { updateOn: "change", validators: [Validators.required, Validators.minLength(6)] }),
    email: new FormControl({ value: "", disabled: false }, { updateOn: "change", validators: [Validators.required, AppValidators.email] }),
    password: new FormControl({ value: "", disabled: false }, { updateOn: "change", validators: [Validators.required] })
  });

  getError(controlName: string, errorName: string): boolean {
    const control = this.registrationForm.controls[controlName];
    if ((this.submitted || control.touched) && control.errors?.[errorName]) {
      return true;
    }
    return false;
  }

  submit() {
    this.submitted = true;
    if (this.registrationForm.valid) {
      this.submitted = false;
      this.registrationForm.reset();
      console.log("sending form");
    }
    else {
      this.registrationForm.markAllAsTouched();
    }
  }
}
