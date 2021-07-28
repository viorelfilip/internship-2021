import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'pending-requests',
        loadChildren: () => import('./tabs/pending-requests/pending-requests.module').then(m => m.PendingRequestsPageModule)
      },
      {
        path: 'requests-history',
        loadChildren: () => import('./tabs/requests-history/requests-history.module').then(m => m.RequestsHistoryPageModule)
      },
      {
        path: 'active-request',
        loadChildren: () => import('./tabs/active-request/active-request.module').then(m => m.ActiveRequestPageModule)
      },
      {
        path: '',
        redirectTo: '/home/pending-requests',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        loadChildren: () => import('./tabs/profile/profile.module').then(m => m.ProfilePageModule)
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
