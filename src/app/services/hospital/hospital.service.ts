import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../service.index';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import Swal from 'sweetalert2';

@Injectable()
export class HospitalService {
    hospital: Hospital;
    token: string;
    usuario: Usuario;
    constructor(
      public http: HttpClient,
      public router: Router,
      public _subirArchivoService: SubirArchivoService
    ) {
      this.cargarStorage();
    }
    /**
     ** Cargar Hospitales
      */
    cargarHospitales( desde: number = 0 ) {
      let url = URL_SERVICIOS + '/hospital?desde=' + desde;
      return this.http.get(url);
    }
    /**
    ** Obtener un Hospital
    **/
    obtenerHospital(id: string) {
      let url = URL_SERVICIOS + '/hospital/' + id;
      return this.http.get(url);
    }
    /**
    ** Borrar Hospital
    **/
    borrarHospital(id: string) {
      let url = URL_SERVICIOS + '/hospital/' + id;
      url += '?token=' + this.token;
      return this.http.delete(url);
    }
    /**
    ** Crear Hospital
    **/
    crearHospital(nombre: string) {
      let url = URL_SERVICIOS + '/hospital?token=' + this.token;
      let nombres = {'nombre': nombre , 'uid': this.usuario._id};
      return this.http.post(url, nombres)
        .map((resp: any) => {
          if (resp.ok) {
            Swal('Hospital Creado', nombre, 'success');
          }
          return resp.hospital;
        });
    }
    /**
    ** Buscar Hospital
    **/
    buscarHospital(termino: string) {
      let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
      return this.http.get(url)
        .map( (resp: any) => resp.hospitales);
    }
    /**
    ** Actualizar Hospital
    **/
    actualizarHospital(hospital: Hospital) {
      let url = URL_SERVICIOS + '/hospital/' + hospital._id;
      url += '?token=' + this.token;
      return this.http.put(url, hospital)
          .map((resp: any) => {
            Swal('Hospital Actualizado', resp.hospital.nombre , 'success');
            return true;
          });
    }
    /**
    ** Helpers
    **/
    // Cargar storage
    cargarStorage() {
      if ( localStorage.getItem('token') ) {
        this.token = localStorage.getItem('token');
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
      } else {
        this.token = '';
        this.usuario = null;
      }

    }
}
