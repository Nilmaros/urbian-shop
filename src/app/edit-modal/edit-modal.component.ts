import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface EditModal {
  title: string;
  message: string;
}

@Component({
  selector: 'app-edit-modal',
  template: `
    <div class="modal-content">
      <div class="modal-header">
        <h4>{{title || 'Alert!'}}</h4>
      </div>
      <div class="modal-body">
        <p>{{message || 'TADAA-AM!'}}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" (click)="close()">OK</button>
      </div>
    </div>
  `
})
export class EditModalComponent extends SimpleModalComponent<EditModal, null> implements EditModal {
  title: string;
  message: string;
  constructor() {
    super();
  }
}