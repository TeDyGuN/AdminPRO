import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { GraficaComponent } from './grafica/grafica.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent},
            { path: 'progress', component: ProgressComponent},
            { path: 'grafica', component: GraficaComponent},
            { path: 'account-settings', component: AccountSettingsComponent},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }
];
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
