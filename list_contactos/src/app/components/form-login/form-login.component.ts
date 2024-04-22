import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent {
  logdata = new FormGroup({
  
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
   
  })

  constructor(private service: UserService){}

  login(){
    const email = this.logdata.value.email!;
    const password = this.logdata.value.password!;
    this.service.login(email,password).subscribe((res)=>{
      console.log(res);
    });
  }
}
