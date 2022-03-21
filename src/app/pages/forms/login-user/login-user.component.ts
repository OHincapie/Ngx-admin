import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router'
import { LocalDataSource } from 'ng2-smart-table';
import { ServerDataSource } from 'ng2-smart-table';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Observable } from 'rxjs/Observable';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent implements OnInit {

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  form: any = {
		email: null,
		password: null
	};
	isLoggedIn = false;
	log=false;
	isLoginFailed = false;
	errorMessage = '';
	roles: string[] = [];
	titulo: string = "Bienvenido";
  constructor(private http: HttpClient, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const {email, password}= this.form;
    let respuesta='FAIL';
    const datos={
      email: email,
      password: password
    }
    
    this.http.post('http://localhost:8080/api/login', datos, {responseType: 'text'})
    .subscribe(res=>{
      respuesta=res;
      console.log(respuesta)
      
    if(respuesta=='OK'){
      this.router.navigateByUrl('pages/tables/usuarios')
    } else{
      this.isLoginFailed=true;
    }
    
    })
    


  }

}
