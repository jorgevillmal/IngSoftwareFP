import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root'
})

export class LoginService{

    API_URI = 'http://localhost:8081';
    status = false;

    jwt: string;

    constructor(private http: HttpClient, private router: Router){}

    autenticar(datos_formulario: any){
        return this.http.post<any>(this.API_URI + '/auth/alumno/login', datos_formulario);
    }

    autenticarAdmin(datos_formulario: any){
        return this.http.post<any>(this.API_URI + '/auth/admin/login', datos_formulario);
    }

    isLoggedIn(){
        if(localStorage.getItem('token')){
            return true;
        }
        return false;
    }

    loggedIn(usuario, res){
        localStorage.setItem('login', 'true');
        localStorage.setItem('usuario', usuario);
        localStorage.setItem('token', res.token);
    }

    logout(){
        localStorage.clear();
        localStorage.setItem('login','false');
    }

    parseJwt(){
        let jwtHelper = new JwtHelperService();
        let objJwt = jwtHelper.decodeToken(this.jwt);
    }

    public isAuthenticated(): boolean {
        let jwtHelper = new JwtHelperService();
        const token = localStorage.getItem('token');
        let objJwt = jwtHelper.decodeToken(token);
        console.log(objJwt);
        return !jwtHelper.isTokenExpired(token);
    }

    loadToken(){
        this.jwt = localStorage.getItem('token');
        this.parseJwt();
    }

    registrar(){
        this.router.navigate(['registro']);
    }
}