import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AddingComponent} from "./adding/adding.component";
import {ScheduleComponent} from "./schedule/schedule.component";

const routes: Routes = [
  {
    path: "schedule",
    component: ScheduleComponent,
    children: [],
  },
  {
    path: "adding",
    component: AddingComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
