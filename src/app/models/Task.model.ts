export class Task {
  name = '';
  id = 0;
  done = false;
  edit = false;
  trash = false;
  startDate: number = Date.now();
  showCompleteButton = true;
  showDeleteButton = true;
  showEditButton = true;
}
