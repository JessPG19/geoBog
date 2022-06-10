import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { MapScreenComponent } from './maps/screens/map-screen/map-screen.component';
import { AuthGuard } from './guards/auth.guard';
import { FormsComponent } from './pages/forms/forms.component';
import { DownloadComponent } from './pages/download/download.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'map',
    component: MapScreenComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'newform/:loc/:id',
    component: FormsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'download',
    component: DownloadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'map',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
