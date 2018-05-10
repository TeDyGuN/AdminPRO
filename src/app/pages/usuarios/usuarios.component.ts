import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
        .subscribe( resp => {
          this.cargarUsuarios();
        });
  }
  mostrarModal( id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }
  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde )
        .subscribe( (resp: any) => {
          this.usuarios = resp.usuarios;
          this.totalRegistros = resp.total;
          this.cargando = false;
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
   this.cargarUsuarios();
  }
  buscarUsuario( termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuario(termino)
      .subscribe( (usuarios: Usuario[] ) => {
        this.cargando = false;
        this.usuarios = usuarios;
      });
  }
  borrrarUsuario( usuario: Usuario ) {
    if ( usuario._id === this._usuarioService.usuario._id ) {
      Swal('Incorrecto', 'No se puede Borrar a si mismo', 'error');
      return;
    }
    Swal({
      title: 'Estas Seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this._usuarioService.borrarUsuario(usuario._id)
          .subscribe( resp => {
            console.log(resp);
            this.cargarUsuarios();
          });
        Swal(
          'Eliminado!',
          'El usuario ha sido borrado',
          'success'
        );
      }
    });
  }
  guardarUsuario( usuario: Usuario) {
    this._usuarioService.actualizarUsuario( usuario )
        .subscribe();
  }
}
