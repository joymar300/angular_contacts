import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalActionComponent } from '../modal-action/modal-action.component';
import { IContacts } from '../../interface/contacs';
import { Observable, Subscription } from 'rxjs';
import { ContactService } from '../../core/services/contact.service';
import { ITypeContacts } from '../../interface/typecontacts';
import { TypecontactService } from '../../core/services/typecontact.service';
import { NotifyrefreshService } from '../../core/services/notifyrefresh.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-table',
  standalone: true,
  imports: [ModalActionComponent],
  templateUrl: './contact-table.component.html',
  styleUrl: './contact-table.component.css'
})
export class ContactTableComponent implements OnInit {
  contacts: IContacts[] = [];
  typecontacts: ITypeContacts[]=[];
  subscription!: Subscription;
  validarCambio= false ;
  constructor(private service: ContactService, private typeservice: TypecontactService){}
  ngOnInit(): void {
    this.loadContacts();
   
  }

  refresh(valid:boolean){
        if(valid){
          this.loadContacts();
        }else{
          console.log("no entró")
        }
    
  }


loadContacts(){
  this.service.getContactsList().subscribe({next : (data) => {
    if (data.length>0) {
      this.contacts = data;
      this.getTypeContact();
      console.log("carga");
      
    }
}, error(err) {
  console.log(err)
},});}

getTypeContact(){
  for(const contac of this.contacts){
    this.typeservice.getType(contac.typecontactid).subscribe({next: (typeContact )=>{
      contac.typecontact = typeContact.type ;
    }, error(err) {
      console.error(err)
    },
  })
    
  }
}
}
