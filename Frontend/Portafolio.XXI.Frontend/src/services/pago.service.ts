import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAllPago() {
        return this.http.get(`api/pago`);
    }

    registrarPago(pago: object) {
        return this.http.post(`api/pago/register`, pago);
    }

    delete(id: string) {
        return this.http.delete(`api/pago/${id}`);
    }
}
