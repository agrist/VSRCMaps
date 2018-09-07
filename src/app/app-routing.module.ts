import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { ThreedComponent } from './threed/threed.component';
import {APP_BASE_HREF} from '@angular/common';

const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'threed', component: ThreedComponent },
  { path: '**', redirectTo: '/map', pathMatch: 'full' }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }]
})

export class AppRoutingModule { }
