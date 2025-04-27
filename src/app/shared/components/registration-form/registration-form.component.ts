import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLogin } from '@app/shared/interfaces';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  submitted = false;

  registrationForm: FormGroup = new FormGroup({
    name: new FormControl({ value: "", disabled: false }, { updateOn: "change", validators: [Validators.required, Validators.minLength(6)] }),
    email: new FormControl({ value: "", disabled: false }),
    password: new FormControl({ value: "", disabled: false }, { updateOn: "change", validators: [Validators.required] })
  });

  @Output()
  onSubmit = new EventEmitter<UserLogin>();

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
      this.onSubmit.emit({
        name: this.registrationForm.controls["name"].value,
        email: this.registrationForm.controls["email"].value,
        password: this.registrationForm.controls["password"].value
      });
      this.submitted = false;
      this.registrationForm.reset();
    }else {
      this.registrationForm.markAllAsTouched();
    }
  }
}
