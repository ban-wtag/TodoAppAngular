export class Task {
  name = '';
  id = 0;
  done = false;
  editable = false;
  startDate: number = Date.now();
  
  [key: string]: any; 
  private static currentId = 0;

  constructor() {
    this.id = Task.currentId;
    Task.currentId++;
  }
}
