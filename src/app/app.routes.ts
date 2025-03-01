import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PageComponent } from './layout/page/page.component';
import { authGuard } from './guards/auth.guard';
import { UsuarioListComponent } from './pages/usuario/usuario-list/usuario-list.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: PageComponent,
    canActivate: [authGuard],
    children:[
      {path: "usuarios", component: UsuarioListComponent}
    ]
  }
];
