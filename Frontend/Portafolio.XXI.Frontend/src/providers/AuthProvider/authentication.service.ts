import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { LoginObject } from "./login-object.model";
import { Session } from "../../utils/mock-core/models/session.model";

@Injectable()
export class AuthenticationService
{

    constructor (private http: HttpClient) { }

    private basePath = '/api/authenticate/';

    login(loginObj: LoginObject): Observable<Session>
    {
        return this.http.post<any>(this.basePath + 'login', loginObj).pipe(map((response: any) => response.json()));
    }

    logout(): Observable<Boolean>
    {
        return this.http.post(this.basePath + 'logout', {}).pipe(map((response: any) => response.json()));
    }
}
