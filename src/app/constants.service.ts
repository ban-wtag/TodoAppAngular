import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  COMPLETE = 'complete';
  EDIT = 'edit';
  DELETE_TODO = 'delete';

  constructor() {}
}
