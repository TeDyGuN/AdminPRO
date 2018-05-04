import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { isNull } from 'util';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  label: string;
  constructor(
    private router: Router,
    public tittle: Title
  ) {
    this.getDataRoute()
    .subscribe( data => {
      this.label = data.titulo;
      this.tittle.setTitle(this.label);
    });
  }

  getDataRoute() {
    return this.router.events
      .filter( evento => evento instanceof ActivationEnd )
      .filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null )
      .map( (evento: ActivationEnd) => evento.snapshot.data);
  }
  ngOnInit() {
  }

}
