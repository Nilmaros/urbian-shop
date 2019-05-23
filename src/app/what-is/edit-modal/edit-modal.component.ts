import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {
  @Input() show = false;
  @Input() customClass = '';
  @Input() closeCallback = () => (false);
  @Input() productToEdit:Product;

  constructor() { }

  ngOnInit() {
  }

}