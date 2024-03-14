import { Component } from "@angular/core";

import { DefaultComponent } from "./default/default.component";
import { SignalsCoomponent } from "./signals/signals.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  standalone: true,
  imports: [DefaultComponent, SignalsCoomponent],
})
export class AppComponent {}
