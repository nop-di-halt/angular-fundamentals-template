import { Component, ChangeDetectorRef } from '@angular/core';
import {
  FormArray,
  FormBuilder, FormControl, FormGroup,
  Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, faTrash, faAdd, faL } from '@fortawesome/free-solid-svg-icons';
import { mockedAuthorsList } from '@app/shared/mocks/mocks';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  authorsList: Array<{ id: string, name: string }>;
  courseAuthors: Array<{ id: string, name: string }> = [];
  deleteIcon = faTrash;
  addIcon = faAdd;
  submitted = false;

  constructor(public fb: FormBuilder, public library: FaIconLibrary, private cdr: ChangeDetectorRef) {
    library.addIconPacks(fas);
    this.authorsList = Array.from(mockedAuthorsList);
  }

  authors = new FormArray<FormControl<{ id: string; name: string } | null>>([]);
  courseForm: FormGroup = new FormGroup({
    title: new FormControl({ value: "", disabled: false }, { updateOn: "blur", validators: [Validators.required, Validators.minLength(2)] }),
    description: new FormControl({ value: "", disabled: false }, { updateOn: "blur", validators: [Validators.required, Validators.minLength(2)] }),
    duration: new FormControl({ value: undefined, disabled: false }, { updateOn: "blur", validators: [Validators.required, Validators.min(0)] }),
    author: new FormControl({ value: "", disabled: false }, { updateOn: "change", validators: [Validators.minLength(2), Validators.pattern("^[A-Za-z\\d ]+$")] }),
    authors: this.authors
  });

  addToCourseAuthors(author: { id: string, name: string }) {
    this.courseAuthors.push(author);
    this.authorsList.splice(this.authorsList.indexOf(author), 1);
    this.authors.push(new FormControl({ value: author, disabled: true }));
    this.cdr.detectChanges();
  }

  removeFromCourseAuthors(author: { id: string, name: string }) {
    this.authorsList.push(author);
    const authors = this.courseForm.controls["authors"] as FormArray;
    const index = authors.controls.findIndex(a => a.value.id == author.id);
    authors.removeAt(index);
    this.cdr.detectChanges()
  }

  createAuthor() {
    const authorCtrl = this.courseForm.controls["author"];
    if (authorCtrl.value && authorCtrl.valid) {
      this.authorsList.push({ id: crypto.randomUUID(), name: authorCtrl.value });
      this.cdr.detectChanges();
      authorCtrl.reset();
    }
  }

  get authorsForm(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  getErrors(controlName: string, errorName: string): boolean {
    const control = this.courseForm.controls[controlName];
    if ((this.submitted || control.touched) && control.errors?.[errorName]) {
      return true;
    }
    return false;
  }
}
