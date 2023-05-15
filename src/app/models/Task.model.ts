export class Task {
  name: string = '';
  id: number = 0;
  done: boolean = false;
  edit: boolean = false;
  trash: boolean = false;
  startDate: number = Date.now();
}
