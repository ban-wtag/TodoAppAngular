import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class ConstantsService {
  COMPLETE = 'complete';
  EDIT = 'edit';
  DELETE_TODO = 'delete';
  REVERT = 'revert';
  SAVE = 'save';
  COMPLETE_AFTER_EDIT = 'completeAfterEdit';
  APP_TITLE = 'Add Tasks';
  MS_PER_DAY = 86400000;
}
