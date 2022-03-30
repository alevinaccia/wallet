import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridStructureComponent } from './grid-structure.component';

describe('GridStructureComponent', () => {
  let component: GridStructureComponent;
  let fixture: ComponentFixture<GridStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
