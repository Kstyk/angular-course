import { Component } from '@angular/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css',
})
export class LogsComponent {
  showDetails = false;
  logs = [];

  onClickButton() {
    this.showDetails = !this.showDetails;
    // this.logs.push(this.logs.length + 1);
    this.logs.push(new Date());
  }

  getBackgroundColor(log: number) {
    if (log > 5) {
      return 'blue';
    } else return 'white';
  }
}
