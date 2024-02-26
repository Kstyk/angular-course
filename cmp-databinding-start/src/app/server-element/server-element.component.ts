import {
  Component,
  Input,
  ViewEncapsulation,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ElementRef,
  ContentChild,
} from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ServerElementComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewChecked,
    AfterViewInit,
    OnDestroy
{
  @Input('srvElement') element: { type: string; name: string; content: string };
  @Input() name: string;
  @ViewChild('heading', { static: true }) header: ElementRef;
  @ContentChild('contentParagraph', { static: true }) paragraph: ElementRef;

  constructor() {
    console.log('constructor called!');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngonchanges called!');
    console.log(changes);
  }

  ngOnInit() {
    console.log('ngoninit called');
    console.log('Text content: ' + this.header.nativeElement.textContent);
    console.log(
      'Text Content of Paragraph: ' + this.paragraph.nativeElement.textContent
    );
  }

  ngDoCheck(): void {
    console.log('ngDoCheck called');
  }

  ngAfterContentInit(): void {
    console.log('ngaftercontentinit called');
    console.log(
      'Text Content of Paragraph: ' + this.paragraph.nativeElement.textContent
    );
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit caled');
    console.log('Text content: ' + this.header.nativeElement.textContent);
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called');
  }
}
