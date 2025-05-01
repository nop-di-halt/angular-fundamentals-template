import { Component } from '@angular/core';

@Component({
  selector: 'app-refresh',
  template: '<p>refreshing...</p>',
})
export class RefreshComponent {
  ngOnInit() {
    console.log("refresh");
  }
}
