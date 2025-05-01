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
  onSearch = new EventEmitter<string>();

  value?:string;

  onSubmit(){
    this.onSearch.emit(this.value);
    this.value="";
  }
}

