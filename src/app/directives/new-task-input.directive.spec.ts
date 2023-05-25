import { NewTaskInputDirective } from './new-task-input.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('NewTaskInputDirective', () => {

  const elementRefMock = {} as ElementRef<any>;
  const rendererMock = {} as Renderer2;
  const directive = new NewTaskInputDirective(elementRefMock, rendererMock);

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

});
