export class Task {
  name = '';
  id = 0;
  done = false;
  edit = false;
  trash = false;
  editable = false;
  startDate: number = Date.now();
  showCompleteButton = true;
  showDeleteButton = true;
  showEditButton = true;
  showRevertButton = false;
  showSaveButton = false;
  showCompleteAfterEditButton = false;
}
