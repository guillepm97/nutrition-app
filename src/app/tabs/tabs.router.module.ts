import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'diary',
        children: [
          {
            path: '',
            loadChildren: '../diary/diary.module#DiaryPageModule'
          }
        ]
      },
      {
        path: 'clients',
        children: [
          {
            path: '',
            loadChildren: '../clients/clients.module#ClientsPageModule'
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: '../profile/profile.module#ProfilePageModule'
          }
        ]
      },
      {
        path: 'feed',
        children: [
          {
            path: '',
            loadChildren: '../feed/feed.module#FeedPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/diary',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/diary',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
