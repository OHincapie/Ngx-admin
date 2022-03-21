

export interface User {
  id?: number,
  nombre?: string,
  apellido?: string,
  email?: string,
  telefono?: string,
  password?: string

}

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ServerDataSource } from 'ng2-smart-table';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Observable } from 'rxjs/Observable';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  prueba = 'prueba';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        editable: false,
        addable: false
      },
      nombre: {
        title: 'Nombre',
        type: 'string'
      },
      apellido: {
        title: 'Apellido',
        type: 'string'
      },
      email: {
        title: 'Email',
        type: 'string'
      },
      telefono: {
        title: 'Telefono',
        type: 'number'
      },
      password: {
        title: 'Password',
        type: 'string'
      }
    },
  };
  public users: any[] = []
  public source = new LocalDataSource()


  constructor(private service: SmartTableData, private http: HttpClient) {
    this.getUsuarios()
    
  }

  getUsuarios() {
    this.http.get('http://localhost:8080/api/usuarios')
      .subscribe((res:any[]) => {
        console.log(res)
        this.users=res;
      })
  }

  addRecord(event) {
    console.log('Hola')
		var usuario: User;
		usuario = event.newData;
    console.log(usuario)
		this.http.post<User>('http://localhost:8080/api/usuario', usuario, { headers: this.httpHeaders }).subscribe(
			res => {
				console.log(res);
				event.confirm.resolve(event.newData);
			},
			(err: HttpErrorResponse) => {
				console.log(err);
			});

    event.confirm.resolve();
    
	}


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      const id=event.data.id
      this.http.delete('http://localhost:8080/api/usuario'+'/'+id)
      .subscribe(res=>{
        console.log(res)
      })
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
