import { Component } from '@angular/core';

@Component({
  // selector: '.app-servers',
  selector: 'app-servers',
  // selector: '[app-servers]',
  templateUrl: './servers.component.html',
  styleUrl: './servers.component.scss',
})
export class ServersComponent {
  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  allowNewServer = false;
  serverCreationStatus = 'No server was created.';
  serverName = 'TestServer';
  serverCreated = false;
  servers = ['Test Server 1', 'Test Server 2'];

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus =
      'Server was created! Name is ' + this.serverName;
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
