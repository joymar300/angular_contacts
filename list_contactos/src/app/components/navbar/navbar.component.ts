import { Component } from '@angular/core';
import { ModalActionComponent } from '../modal-action/modal-action.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ModalActionComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
