import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imagen: File;
  imagenSubir: Boolean;
  imagenTemp: string;
  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) {
  }

  ngOnInit() {
  }
  subirImagen() {
    this._subirArchivoService.subirArchivo(this.imagen, this._modalUploadService.tipo, this._modalUploadService.id)
        .then( resp => {
          this._modalUploadService.notificacion.emit( resp );
          this.cerrarModal();
        })
        .catch( err => {
          console.log('error en la carga');
        });
  }
  seleccionImagen( archivo: File ) {
    if ( !archivo ) {
      this.imagenSubir = false;
      this.imagen = null;
      return;
    }
    if ( archivo.type.indexOf('image') < 0) {
      Swal('Solo Imaenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = true;
    this.imagen = archivo;

    let reader = new FileReader();
    let urlImageTemp = reader.readAsDataURL( archivo );
    reader.onloadend = ( resp) => {
      this.imagenTemp = reader.result;
      // console.log(reader.result);
    };
  }
  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }
}
