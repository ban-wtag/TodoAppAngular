import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class UtilityService {
  show = false;
  COMPLETE = 'complete';
  EDIT = 'edit';
  DELETE_TODO = 'delete';
}
