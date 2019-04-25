import { AppPage } from './app.po';
import { browser, logging, by, element } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Should display welcome message', () => {
    page.navigateTo();
    browser.ignoreSynchronization = true;
    expect(page.getTitleText('bio', 'h2')).toEqual(`Arash's biography`);
  });

  it('Should display ME nav menu', () => {
    page.navigateTo();
    expect(page.getMenuByNumber(0, 'a').getText()).toEqual('Me');
  });

  it('Should display House nav menu', () => {
    page.navigateTo();
    browser.debugger();
    expect(page.getMenuByNumber(1, 'a').getText()).toEqual('House');
  });

  it('Should show message when clicks on house menu', () => {
    page.navigateTo();
    page.getMenuByNumber(1, 'a').click();
    expect(page.getTitleText('house', 'h2')).toEqual('This page is developing');
  });

  it('Should show Login button when click on Admin menu', () => {
    page.navigateTo();
    page.getMenuByNumber(2, 'a').click();
    expect(page.getTitleText('login', 'button')).toEqual('Login');
  });

  // afterEach(async () => {
  //   // Assert that there are no errors emitted from the browser
  //   const logs = await browser.manage().logs().get(logging.Type.BROWSER);
  //   expect(logs).not.toContain(jasmine.objectContaining({
  //     level: logging.Level.SEVERE,
  //   } as logging.Entry));
  // });
});
