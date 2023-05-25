import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appNewTaskInput]',
})

export class NewTaskInputDirective implements AfterViewInit{
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  ngAfterViewInit(): void {
    this.focus();
  }
  
  focus(): void {
    const elm = this.renderer.selectRootElement(this.elementRef.nativeElement)
    elm.focus();
  }
}
