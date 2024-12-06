import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TictactoeComponent } from './tictactoe/tictactoe.component';
import { TodoComponent } from './todo/todo.component';
import { KanbanComponent } from './kanban/kanban.component';
import { CropperComponent } from './cropper/cropper.component';
import { AuthGuard } from './auth/login.guard';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path : 'tictactoe',
    component : TictactoeComponent,
  },
  {
    path : 'todo',
    component : TodoComponent,
    canActivate: [AuthGuard]
  },
  {
    path : 'kanban',
    component : KanbanComponent,
    canActivate: [AuthGuard]

  },{
    path : 'cropper',
    component : CropperComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
