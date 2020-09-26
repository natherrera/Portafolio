import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { LoginObject } from "../../../providers/AuthProvider/login-object.model";
import { AuthenticationService } from "../../../providers/AuthProvider/authentication.service";
import { StorageService } from "../../../services/storage.service";
import { Session } from "../../../utils/mock-core/models/session.model";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit
{

  public loginForm: FormGroup;
  public submitted: Boolean = false;
  constructor (private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private storageService: StorageService,
    private router: Router) { }

  ngOnInit(): void
  {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  public submitLogin()
  {
    this.submitted = true;
    if (this.loginForm.valid)
    {
      this.authenticationService.login(new LoginObject(this.loginForm.value)).subscribe(
        data => this.correctLogin(data),
        // error => this.error = JSON.parse(error._body)
      )
    }
  }

  private correctLogin(data: Session){
    this.storageService.setCurrentSession(data);
    this.router.navigate(['/']);
  }
}
