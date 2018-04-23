import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaComponent } from './grafica/grafica.component';
import { PagesComponent } from './pages.component';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.route';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        GraficaComponent,
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        GraficaComponent,
    ]
})
export class PagesModule { }
