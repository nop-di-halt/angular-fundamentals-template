import { Component, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import {
  FormArray,
  FormBuilder, FormControl, FormGroup,
  Validators
} from '@angular/forms';
import { Author, CourseFormData } from '@app/shared/interfaces';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, faTrash, faAdd, faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  authorsList: Array<Author> = [];
  courseAuthors: Array<Author> = [];
  deleteIcon = faTrash;
  addIcon = faAdd;
  submitted = false;

  constructor(public fb: FormBuilder, public library: FaIconLibrary, private cdr: ChangeDetectorRef) {
    library.addIconPacks(fas);
  }

  authors = new FormArray<FormControl<{ id: string; name: string } | null>>([]);
  courseForm: FormGroup = new FormGroup({
    title: new FormControl({ value: "", disabled: false }, { updateOn: "blur", validators: [Validators.required, Validators.minLength(2)] }),
    description: new FormControl({ value: "", disabled: false }, { updateOn: "blur", validators: [Validators.required, Validators.minLength(2)] }),
    duration: new FormControl({ value: undefined, disabled: false }, { updateOn: "blur", validators: [Validators.required, Validators.min(0)] }),
    author: new FormControl({ value: "", disabled: false }, { updateOn: "change", validators: [Validators.minLength(2), Validators.pattern("^[A-Za-z\\d ]+$")] }),
    authors: this.authors
  });

  addToCourseAuthors(author: Author) {
    this.courseAuthors.push(author);
    this.authorsList.splice(this.authorsList.indexOf(author), 1);
    this.authors.push(new FormControl({ value: author, disabled: true }));
    this.cdr.detectChanges();
  }

  removeFromCourseAuthors(author: Author) {
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

  @Output()
  onFormSubmit = new EventEmitter<CourseFormData>();

  submit() {
    this.submitted = true;
    if (this.courseForm.valid) {
      const authorsCtrl = this.courseForm.get("authors") as FormArray;
      const course = {
        title: this.courseForm.controls["title"].value,
        description: this.courseForm.controls["description"].value,
        duration: this.courseForm.controls["duration"].value,
        authors: authorsCtrl.controls.map(c => c.value["id"]),
      };
      this.onFormSubmit.emit(course);
    } else {
      this.courseForm.markAllAsTouched();
    }
  }

  getErrors(controlName: string, errorName: string): boolean {
    const control = this.courseForm.controls[controlName];
    if ((this.submitted || control.touched) && control.errors?.[errorName]) {
      return true;
    }
    return false;
  }
}
