import { createAction, props } from '@ngrx/store';

export const addTask = createAction(
  '[Todo] Add Task',
  props<{ name: string }>()
);

export const toggleTask = createAction(
  '[Todo] Toggle Task',
  props<{ id: number }>()
);

export const deleteTask = createAction(
  '[Todo] Delete Task',
  props<{ id: number }>()
);
