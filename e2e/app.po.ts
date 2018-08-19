import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getButtonText() {
    return element(by.tagName('button')).getText();
  }
}
