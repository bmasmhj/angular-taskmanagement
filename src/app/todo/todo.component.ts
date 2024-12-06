import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  task: string = '';
  tasks: { id: number, name: string}[] = [];

  constructor(private todoService: TodoService , private translate: TranslateService) {}

  ngOnInit(): void {
    // Subscribe to task updates
    this.todoService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  addTask(): void {
    if (this.task) {
      this.todoService.addTask(this.task);
      this.task = '';
    }
  }

  toggleTask(id: number): void {
    this.todoService.toggleTask(id);
  }
  toggleAllTask(): void {
    this.todoService.toggleAllTask();
  }

  deleteTask(id: number): void {
    this.todoService.deleteTask(id);
  }
  moveToTodoTask(id: number): void {
    this.todoService.moveToTodoTask(id);
  }
}
