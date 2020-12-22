import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get("/quescom");
  }

  getTitleText() {
    return element(by.css('app-root')).getText() as Promise<string>;
  }
}
