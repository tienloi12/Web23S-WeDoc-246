import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeShareComponent } from './home-share.component';

describe('HomeShareComponent', () => {
  let component: HomeShareComponent;
  let fixture: ComponentFixture<HomeShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeShareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
