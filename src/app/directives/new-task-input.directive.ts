import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNewTaskInput]',
})
export class NewTaskInputDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    // this.focus();
  }
  focus(): void {
    this.renderer.selectRootElement(this.elementRef.nativeElement).focus();
  }
}
