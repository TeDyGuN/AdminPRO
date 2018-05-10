import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpRequest } from 'selenium-webdriver/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';

@Injectable()
export class MedicoService {

  totalMedicos: number = 0;
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }
  cargarMedicos() {
    let url = URL_SERVICIOS + '/medico';

    return this.http.get( url )
        .map( (resp: any) => {
          this.totalMedicos = resp.total;
          return resp.medicos;
        });
  }
  buscarMedicos ( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get( url )
               .map( (resp: any) => resp.medicos);
  }
  borrarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
              .map( resp => {
                Swal('Medico Borrado', 'Medico Borrado Correctamente', 'success');
              });

  }
  guardarMedico(medicos: Medico) {
    let url = URL_SERVICIOS + '/medico';
    if ( medicos._id ) {
      url += '/' + medicos._id + '?token=' + this._usuarioService.token;
      return this.http.put(url, medicos)
          .map( (resp: any) => {
            Swal('Medico Actualizado', medicos.nombre, 'success');
            return resp.medico;
          });
    } else {
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, medicos)
          .map( (resp: any) => {
            Swal('Medico Creado', medicos.nombre, 'success');
            return resp.medico;
          });
    }

  }
  cargarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get( url )
              .map( (resp: any) => resp.medico);
  }

}
