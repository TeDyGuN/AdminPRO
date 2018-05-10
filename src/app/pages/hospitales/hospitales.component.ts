import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';
import { HospitalService } from '../../services/hospital/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  desde: number = 0;
  hospitales: Hospital[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;
  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) {
  }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
        .subscribe( resp => {
          this.cargarHospitales();
        });
  }
  mostrarModal( id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }
  cargarHospitales() {
    this.cargando = true;
    this._hospitalService.cargarHospitales(this.desde)
        .subscribe((resp: any) => {
          this.hospitales = resp.hospitales;
          this.totalRegistros = resp.total;
          this.cargando = false;
        });
  }
  buscarHospital( termino: string ) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this._hospitalService.buscarHospital(termino)
      .subscribe( (hospitales: Hospital[] ) => {
        this.cargando = false;
        this.hospitales = hospitales;
      });
  }
  borrarHospital( hospital: Hospital ) {
    Swal({
      title: 'Estas Seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this._hospitalService.borrarHospital(hospital._id)
          .subscribe( resp => {
            console.log(resp);
            this.cargarHospitales();
          });
        Swal(
          'Eliminado!',
          'El Hospital ha sido borrado',
          'success'
        );
      }
    });
  }
  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;
    if ( desde >= this.totalRegistros) {
      return;
    }
    if ( desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarHospitales();
  }
  guardarHospital( hospital: Hospital ) {
    this._hospitalService.actualizarHospital( hospital )
        .subscribe();
  }
  hospitalModal() {
    Swal({
      title: 'Crear Hospital',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Crear'
    }).then((result) => {
      if (result.value) {
        this._hospitalService.crearHospital(result.value)
          .subscribe( resp => {
            this.cargarHospitales();
          });
      }
    });
  }
}
