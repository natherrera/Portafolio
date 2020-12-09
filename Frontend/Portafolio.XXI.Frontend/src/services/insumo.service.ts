import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(`api/insumo`);
    }

    createInsumos(insumo: object) {
        return this.http.post(`api/insumo/crear`, insumo);
    }

    setInsumo(id: number, costo: number, unidadMedida: string) {
        return this.http.post(`api/insumo/actualizar`, {id, costo, unidadMedida});
    }

    getInsumosById(id: number) {
        return this.http.get(`api/insumo/${id}`);
    }

    deleteInsumo(id: number) {
        return this.http.delete(`api/insumo/delete${id}`);
    }
}