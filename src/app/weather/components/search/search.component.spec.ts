import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { Weather } from '../../../model/weather';

const mockWeather: Weather = {
  city: {
    id: 1,
    name: 'Bedford'
  },
  list: [
    {
      main: {
        temp: 10
      }
    }
  ]
};

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component successfully', () => {
    expect(component).toBeTruthy();
  });

  describe('When the component is loaded properly', () => {
    it('should render the `Search` button as expected', async(() => {
      // Act
      const compiled = fixture.debugElement.nativeElement;
      // Assert
      expect(compiled.querySelector('button').textContent).toEqual('Search');
    }));

    it('should emit the city as entered in the textbox', async(() => {
      // Arrange
      spyOn(component, 'search');
      const compiled = fixture.debugElement.nativeElement;
      component.city = 'Bedford';
      const button = compiled.querySelector('button');
      // Act
      button.click();
      fixture.whenStable().then(() => {
        // Assert
        expect(component.search).toHaveBeenCalled();
        component.searchCity.subscribe(city => {
          expect(city).toBe('Bedford');
        });
      });
    }));
  });
});
