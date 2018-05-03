import { Routes, RouterModule, CanActivate } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaComponent } from './grafica/grafica.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'}},
            { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressComponent'}},
            { path: 'grafica', component: GraficaComponent, data: { titulo: 'Graficas'}},
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'}},
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Observables'}},
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Perfli de Usuario'}},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }
];
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
