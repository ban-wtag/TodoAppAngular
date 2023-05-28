export class Task {
  name = '';
  id = 0;
  done = false;
  startDate: number = Date.now();

  private static currentId = 0;

  constructor() {
    this.id = Task.currentId;
    Task.currentId++;
  }
}
