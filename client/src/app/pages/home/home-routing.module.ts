import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/services/firebase/auth/auth.service';
import { AuthGuardService } from 'src/app/services/guards/auth/auth-guard.service';
import { HomePage } from './home.page';


const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'request-consultant',
        loadChildren: () => import('./tabs/request-consultant/request-consultant.module').then(m => m.RequestConsultantPageModule)
      },
      {
        path: 'active-requests',
        loadChildren: () => import('./tabs/active-requests/active-requests.module').then(m => m.ActiveRequestsPageModule)
      },
      {
        path: 'requests-history',
        loadChildren: () => import('./tabs/requests-history/requests-history.module').then(m => m.RequestsHistoryPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./tabs/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/home/request-consultant',
        pathMatch: 'full'
      }
    ]
  },


];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
