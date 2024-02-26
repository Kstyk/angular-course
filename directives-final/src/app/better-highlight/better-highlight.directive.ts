import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  // przykład użycia z aliasem z tą samą nazwą co dyrektywa
  @Input('appBetterHighlight') highlightColor: string = 'lightblue';
  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.backgroundColor = this.defaultColor;
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   'background-color',
    //   'lightblue'
    // );
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // Dwie metody tworzenia bindingu do elementu

    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   'background-color',
    //   'lightblue'
    // );
    this.backgroundColor = this.highlightColor;
  }
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   'background-color',
    //   'transparent'
    // );
    this.backgroundColor = this.defaultColor;
  }
}
