import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styles: []
})
export class ProfilesComponent implements OnInit {
  usuario: Usuario;
  imagen: File;
  imagenSubir: Boolean;
  imagenTemp: string;
  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
    this.imagenSubir = false;
  }

  ngOnInit() {
  }
  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }
    console.log(usuario);
    this._usuarioService.actualizarUsuario(this.usuario)
          .subscribe( );
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
  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagen, this.usuario._id);

  }
}
