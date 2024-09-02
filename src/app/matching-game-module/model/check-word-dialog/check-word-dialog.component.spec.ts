import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckWordDialogComponent } from './check-word-dialog.component';

describe('CheckWordDialogComponent', () => {
  let component: CheckWordDialogComponent;
  let fixture: ComponentFixture<CheckWordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckWordDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckWordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
