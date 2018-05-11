import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/filter';
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  constructor() {
    this.subscription = this.regresarObservable()
      .subscribe(
        numero => console.log('Subs', numero),
        error => console.log('Error en el Obs', error),
        () => console.log('El OBservador Termino')
    );
  }

  ngOnInit() {
  }


  regresarObservable(): Observable <any> {
    return new Observable( observer => {
      let contador = 0;
      let intervalo = setInterval( () => {
        contador += 1;

        let salida = {
          valor: contador
        };

        observer.next( salida );

        /* if ( contador === 3 ) {
          clearInterval( intervalo );
          observer.complete();
        } */

        /* if ( contador === 2 ) {
          clearInterval( intervalo );
          observer.error('Auxilio CTM!!');
        } */
      }, 500);
    })
    .retry(2)
    .map( (resp: any) => {
      return resp.valor;
    })
    .filter( (valor, index) => {
      if ( (valor % 2) === 1 ) {
        return true;
      } else {
        return false;
      }
    });

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
