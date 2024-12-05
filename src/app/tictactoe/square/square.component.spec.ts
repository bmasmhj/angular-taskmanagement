import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TictactoeSquareComponent } from './square.component';

describe('TictactoeSquareComponent', () => {
  let component: TictactoeSquareComponent;
  let fixture: ComponentFixture<TictactoeSquareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TictactoeSquareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TictactoeSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
