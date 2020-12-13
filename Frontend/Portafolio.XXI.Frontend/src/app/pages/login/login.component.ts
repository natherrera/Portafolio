import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { AuthenticationService } from "../../../services/authentication.service";
import { StorageService } from "../../../services/storage.service";
import { Session } from "../../../utils/mock-core/models/session.model";
import { products } from '../../../utils/mock-responses/producto/productsResponse';
import { insumos } from '../../../utils/mock-responses/insumo/insumoResponse';
import { trabajadors } from 'src/utils/mock-responses/trabajador/trabajadorResponse';
import { PROVEEDOR } from 'src/utils/mock-responses/proveedor/proveedorResponse';
import { activos } from '../../../utils/mock-responses/activos/activosResponse';
import { PEDIDO_DATA } from 'src/utils/mock-responses/pedidos/pedidosResponse';
import { MESAS_DATA } from '../../../utils/mock-responses/mesas/mesasResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit
{

  public loginForm: FormGroup;
  public submitted: Boolean = false;
  public profile: any;
  public user: any;
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
    this.storageService.setCurrentSession(data);
    this.user = this.storageService.getCurrentUser();
    this.storageService.setCurrentProducts(products);
    this.storageService.setCurrentInsumo(insumos);
    this.storageService.setCurrentTrabajador(trabajadors);
    this.storageService.setCurrentProveedor(PROVEEDOR);
    this.storageService.setCurrentActivos(activos);
    this.storageService.setCurrentPedidos(PEDIDO_DATA);
    this.storageService.setCurrentMesas(MESAS_DATA);
    this.profile = this.user.profile.type;
    switch (this.profile) {
      case 'cliente':
        this.router.navigate(['/restaurant']);
        break;

        default:
          this.router.navigate(['/dashboard']);
        break;
    }
  }
}
