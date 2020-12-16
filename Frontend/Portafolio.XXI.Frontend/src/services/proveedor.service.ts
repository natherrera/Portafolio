import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(`api/proveedor`);
    }

    createProveedor(proveedor: object) {
        return this.http.post(`api/proveedor/crear`, proveedor);
    }

    setProveedor(id: string, tipoProveedor: string) {
        return this.http.post(`api/proveedor/actualizar`, {id, tipoProveedor});
    }

    getProveedorById(id: string) {
        return this.http.get(`api/proveedor/${id}`);
    }

    deleteProveedor(id: string) {
        return this.http.delete(`api/proveedor/delete${id}`);
    }
}