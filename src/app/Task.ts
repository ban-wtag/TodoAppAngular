export interface Task {
  name: string;
  id?: number;
  done: boolean;
  edit: boolean;
  trash: boolean;
  startDate: Number;
}
