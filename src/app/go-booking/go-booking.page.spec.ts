import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GoBookingPage } from './go-booking.page';

describe('GoBookingPage', () => {
  let component: GoBookingPage;
  let fixture: ComponentFixture<GoBookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoBookingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GoBookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
