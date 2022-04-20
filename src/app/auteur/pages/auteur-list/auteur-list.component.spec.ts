import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuteurListComponent } from './auteur-list.component';

describe('AuteurListComponent', () => {
  let component: AuteurListComponent;
  let fixture: ComponentFixture<AuteurListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuteurListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuteurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
