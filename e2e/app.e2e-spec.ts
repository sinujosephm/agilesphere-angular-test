import { AppPage } from './app.po';

describe('angular-weather App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should the correct application heading', () => {
    // Act
    page.navigateTo();
    // Assert
    expect(page.getParagraphText()).toEqual('AgileSphere coding test - The Weather App');
  });

  it('should search weather in Bedford city', () => {
    // Act
    page.getCitySearchBox().sendKeys('Bedford');
    page.getCitySearchButton().click().then(() => {
      // Assert
      expect(page.getListOfTableRows().count()).toEqual(1);
      expect(page.getListOfCityNames().get(0).getText()).toEqual('Bedford');
    });
  });

  it('should have table with nine columns', () => {
    // Act
    page.getCitySearchBox().sendKeys('Bedford');
    page.getCitySearchButton().click().then(() => {
      // Assert
      expect(page.getListOfTableColumns().count()).toEqual(9);
    });
  });
});
