import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobsComponent } from './views/jobs/jobs.component';
import { UsersComponent } from './views/users/users.component';



const routes: Routes = [
	{
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'jobs',
    component: JobsComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
