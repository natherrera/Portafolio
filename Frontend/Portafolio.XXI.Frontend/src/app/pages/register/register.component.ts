import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../../../services/alert.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit
{
  public registrationForm: FormGroup;
  public loading = false;
  public submitted = false;
  public error: {code: number, message: string} = null;

  constructor (private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService)
  {
    if (this.authenticationService.currentUserValue)
    {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void
  {
    debugger;
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  get f() { return this.registrationForm.controls; }

  submitRegistration()
  {
    debugger;
    console.log('object')
    this.submitted = true;

    this.alertService.clear();

    if (this.registrationForm.invalid)
    {
      return;
    }

    this.loading = true;
    this.userService.register(this.registrationForm.value)
      .pipe(first())
      .subscribe(
        data =>
        {
          // this.alertService.success('Registro exitoso', true);
          this.router.navigate(['/login']);
        },
        error =>
        {
          this.alertService.error(error);
          this.loading = false;
          this.error = error;
        });
  }

}
