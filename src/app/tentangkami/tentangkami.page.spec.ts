import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TentangkamiPage } from './tentangkami.page';

describe('TentangkamiPage', () => {
  let component: TentangkamiPage;
  let fixture: ComponentFixture<TentangkamiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TentangkamiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TentangkamiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
