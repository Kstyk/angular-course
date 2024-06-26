import { NgFor } from "@angular/common";
import { Component, computed, effect, signal } from "@angular/core";

@Component({
  selector: "app-signals",
  templateUrl: "./signals.component.html",
  standalone: true,
  imports: [NgFor],
})
export class SignalsCoomponent {
  actions = signal<string[]>([]);
  counter = signal(0);
  doubleCounter = computed(() => this.counter() * 2);

  constructor() {
    effect(() => console.log(this.counter()));
  }

  increment() {
    this.counter.update((oldValue) => oldValue + 1);
    // this.counter.set(this.counter() + 1);
    // this.counter.mutate((oldValue) => oldValue + 1); // deleted in angular 17 dont use
    this.actions.update((oldValue) => [...oldValue, "INCREMENT"]);
  }

  decrement() {
    this.counter.update((oldValue) => oldValue - 1);
    this.actions.update((oldValue) => [...oldValue, "DECREMENT"]);
  }
}
