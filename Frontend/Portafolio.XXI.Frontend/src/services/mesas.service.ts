import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(`api/mesas`);
    }

    crearMesa(mesa: object) {
        return this.http.post(`api/mesas/crear`, mesa);
    }

    setMesaState(id: string, estado: string) {
        return this.http.post(`api/mesas/actualizar`, {id, estado});
    }

    deleteMesa(id: number) {
        return this.http.delete(`api/mesas/${id}`);
    }
}
