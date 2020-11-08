import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(`api/cocina`);
    }

    crearOrdenCocina(orden: object) {
        return this.http.post(`api/cocina/create`, orden);
    }

    delete(id: number) {
        return this.http.delete(`api/cocina/${id}`);
    }
}
