import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColabDialogComponent } from './colab-dialog.component';

describe('ColabDialogComponent', () => {
  let component: ColabDialogComponent;
  let fixture: ComponentFixture<ColabDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColabDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColabDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
