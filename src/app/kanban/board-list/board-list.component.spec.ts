import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanBoardListComponent } from './board-list.component';

describe('KanbanBoardListComponent', () => {
  let component: KanbanBoardListComponent;
  let fixture: ComponentFixture<KanbanBoardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanBoardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanBoardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
