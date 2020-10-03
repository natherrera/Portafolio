import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get(`api/users`);
    }

    register(user: object) {
        return this.http.post(`api/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`api/users/${id}`);
    }
}
