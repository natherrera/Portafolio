import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(`api/insumo`);
    }

    crearMesa(insumo: object) {
        return this.http.post(`api/insumo/crear`, insumo);
    }

    setMesaState(id: string, tipoInsumo: string) {
        return this.http.post(`api/insumo/actualizar`, {id, tipoInsumo});
    }

    deleteMesa(id: number) {
        return this.http.delete(`api/insumo/${id}`);
    }
}