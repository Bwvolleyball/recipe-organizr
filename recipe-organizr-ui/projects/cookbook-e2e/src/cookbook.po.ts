import { browser, by, element } from 'protractor';

export class CookbookPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('cookbook-root h1')).getText() as Promise<string>;
  }
}
