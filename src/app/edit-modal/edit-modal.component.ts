import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface EditModal {
  title: string;
  message: string;
}

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
})

export class EditModalComponent extends SimpleModalComponent<EditModal, null> implements EditModal {
  title: string;
  message: string;
  constructor() {
    super();
  }
}