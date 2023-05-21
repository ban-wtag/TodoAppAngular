import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appNewTaskInput]',
})

export class NewTaskInputDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.focus();
  }
  focus(): void {
    const elm = this.renderer.selectRootElement(this.elementRef.nativeElement)
    elm.focus();
  }
}
