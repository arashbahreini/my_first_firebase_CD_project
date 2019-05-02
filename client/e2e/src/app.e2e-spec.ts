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
    expect(page.getMenuByNumber(4, 'a').getText()).toEqual('House');
  });

  it('Should show message when clicks on house menu', () => {
    page.navigateTo();
    page.getMenuByNumber(4, 'a').click();
    expect(page.getTitleText('house', 'h2')).toEqual('This page is developing');
  });

  it('Should show Login button when click on Admin menu', () => {
    page.navigateTo();
    page.getMenuByNumber(5, 'a').click();
    expect(page.getTitleText('login', 'button')).toEqual('Login');
  });

  // it('Should show student menu', () => {
  //   page.navigateTo();
  //   expect(page.getMenuByName(0, 'app-home div a').getText()).toEqual('shangol');
  //   expect(page.getMenuByName(1, 'a').getText()).toEqual('shangol');
  //   expect(page.getMenuByName(2, 'a').getText()).toEqual('shangol');
  //   expect(page.getMenuByName(3, 'a').getText()).toEqual('shangol');

  // });

  // it('Should show student dialog', () => {
  //   page.navigateTo();
  //   page.getMenuByNumber(3, 'a').click();
  //   expect(page.getTitleText('student', 'h5')).toEqual('Description about this page');
  // });
});
