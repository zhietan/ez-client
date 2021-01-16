import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StartingappPage } from './startingapp.page';

describe('StartingappPage', () => {
  let component: StartingappPage;
  let fixture: ComponentFixture<StartingappPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartingappPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StartingappPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
