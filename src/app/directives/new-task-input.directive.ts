import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appNewTaskInput]',
})

export class NewTaskInputDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  focus(): void {
   this.renderer.selectRootElement(this.elementRef.nativeElement).focus();
  }
}
