import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TictactoeComponent } from './tictactoe/tictactoe.component';
import { TodoComponent } from './todo/todo.component';
import { KanbanComponent } from './kanban/kanban.component';

const routes: Routes = [
  {
    path : 'tictactoe',
    component : TictactoeComponent
  },
  {
    path : 'todo',
    component : TodoComponent
  },
  {
    path : 'kanban',
    component : KanbanComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
