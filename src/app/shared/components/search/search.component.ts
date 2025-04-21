import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input()
  placeholder = "Input text";

  @Output()
  search = new EventEmitter<string>();

  value?:string;

  onSubmit(){
    this.search.emit(this.value);
    this.value="";
  }
}

