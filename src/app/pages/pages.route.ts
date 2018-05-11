import { Routes, RouterModule, CanActivate } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaComponent } from './grafica/grafica.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfilesComponent } from './profiles/profiles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/guards/admin.guard';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';

const pagesRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: { titulo: 'Dashboard'},
        canActivate: [VerificaTokenGuard]
    },
    { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressComponent'}},
    { path: 'grafica', component: GraficaComponent, data: { titulo: 'Graficas'}},
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'}},
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Observables'}},
    { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema'}},
    { path: 'perfil', component: ProfilesComponent, data: { titulo: 'Perfli de Usuario'}},
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador'}},
    // Mantenimientos
    {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [ AdminGuard ],
        data: { titulo: 'Mantenimiento de Usuarios'}
    },
    { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales'}},
    { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Medicos'}},
    { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Medico'}},
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
