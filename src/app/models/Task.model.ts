export class Task {
  name = '';
  id = 0;
  done = false;
  edit = false;
  trash = false;
  editable = false;
  errorMessage = '';
  startDate: number = Date.now();
  showCompleteButton = true;
  showDeleteButton = true;
  showEditButton = true;
  showRevertButton = false;
  showSaveButton = false;
  showCompleteAfterEditButton = false;
  
  [key: string]: any;
}
