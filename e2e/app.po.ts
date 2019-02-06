import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root a')).getText();
  }

  getListOfCityNames() {
    return element.all(by.css('app-results tbody tr td'));
  }

  getCitySearchBox() {
    return element(by.css('app-search input#city'));
  }


  getListOfTableRows() {
    return element.all(by.css('app-results tbody tr'));
  }

  getCitySearchButton() {
    return element(by.css('app-search button[type="submit"]'));
  }

  getListOfTableColumns() {
    return element.all(by.css('app-results tbody tr:first-child td'));
  }
}
