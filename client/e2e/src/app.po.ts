import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-home h2')).getText() as Promise<string>;
  }

  getMeMenu() {
    return element(by.css('app-home [routerLink]="arash"')).getText() as Promise<string>;
  }
}
