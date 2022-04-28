import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModesComponent } from './list-modes.component';

describe('ListModesComponent', () => {
  let component: ListModesComponent;
  let fixture: ComponentFixture<ListModesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListModesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListModesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
