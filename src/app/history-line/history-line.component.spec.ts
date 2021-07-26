import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryLineComponent } from './history-line.component';

describe('HistoryLineComponent', () => {
  let component: HistoryLineComponent;
  let fixture: ComponentFixture<HistoryLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
