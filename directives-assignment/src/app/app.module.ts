import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LogsComponent } from './logs/logs.component';
import { LogComponent } from './log/log.component';

@NgModule({
  declarations: [AppComponent, LogsComponent, LogComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
