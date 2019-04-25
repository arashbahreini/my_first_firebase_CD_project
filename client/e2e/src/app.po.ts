import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText(componentTag: string, el: string) {
    return element(by.css(`app-${componentTag} ${el}`)).getText() as Promise<string>;
  }

  getMenuByNumber(no: number, el: string) {
    return element.all(by.css(`app-home ${el}`)).get(no);
  }
}
