import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { LoginObject } from "../../../providers/AuthProvider/login-object.model";
import { AuthenticationService } from "../../../services/authentication.service";
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
  public error: {code: number, message: string} = null;
  public loading = false;

  constructor (private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private storageService: StorageService,
    private router: Router) { }

  ngOnInit(): void
  {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  public submitLogin()
  {
    this.submitted = true;
    if (this.loginForm.valid)
    {
      this.loading = true;
      this.authenticationService.login(this.loginForm.value).subscribe(
        data => this.correctLogin(data),
        error => {
          this.error = error;
          this.loading = false;
        }
      )
    }
  }

  private correctLogin(data: Session){

    console.log("aqui")
    this.storageService.setCurrentSession(data);
    this.router.navigate(['/home']);
  }
}
