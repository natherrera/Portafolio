import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(`api/trabajador`);
    }

    createTrabajador(trabajador: object) {
        return this.http.post(`api/trabajador/crear`, trabajador);
    }

    setTrabajador(rut: string, nombre: string, apellidoMaterno: string, apellidoPaterno: string, fechaNacimiento: string) {
        return this.http.post(`api/trabajador/actualizar`, {rut, nombre, apellidoMaterno, apellidoPaterno, fechaNacimiento});
    }

    getTrabajadorById(rut: string) {
        return this.http.get(`api/trabajador/${rut}`);
    }

    deleteTrabajador(rut: string) {
        return this.http.delete(`api/trabajador/delete${rut}`);
    }
}