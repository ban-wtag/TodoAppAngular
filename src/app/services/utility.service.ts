import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class UtilityService {
  show = false;
  COMPLETE = 'complete';
  EDIT = 'edit';
  DELETE_TODO = 'delete';
  APP_TITLE = 'Add Tasks';
  MS_PER_DAY = 86400000;
}
