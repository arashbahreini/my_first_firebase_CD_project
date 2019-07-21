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
    expect(page.getMenuByName(0, 'app-bio h2').getText()).toEqual(`Arash's biography`);
  });

  it('Should open dialog when click on Add button and dialog should have appropriate manner.', () => {
    page.navigateTo();
    page.getMenuByNumber(1, 'a').click();
    page.getMenuByNumber(2, 'a').click();
    browser.waitForAngularEnabled(true);
    page.getElementByClass('text-center', 8).element(by.className('btn btn-success')).click();
    browser.waitForAngularEnabled(true);
    // expect(element(by.css('app-add-edit h1')).getText()).toEqual('Add - Edit Student');

    expect(element(by.className('btn btn-success ml-1')).isEnabled()).toEqual(false);

    element(by.name('firstName')).sendKeys('Arash');
    element(by.name('lastName')).sendKeys('Arash');
    element(by.name('age')).sendKeys(1);
    element(by.name('grade')).sendKeys('A++');
    element(by.name('dateOfBirth')).sendKeys('1990/1/1');

    expect(element(by.className('btn btn-success ml-1')).isEnabled()).toEqual(true);
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

  it('Should display Student menu when clicking on Work samples', () => {
    page.navigateTo();
    page.getMenuByNumber(1, 'a').click();
    expect(page.getMenuByNumber(2, 'a').getText()).toEqual(`Student - CRUD`);
  });

  it('Should display ChatBox - Web socket when clicking on Work samples', () => {
    page.navigateTo();
    page.getMenuByNumber(1, 'a').click();
    expect(page.getMenuByNumber(3, 'a').getText()).toEqual(`ChatBox - Web socket`);
  });

  it('Should show create table when clicks on Student - CRUD', () => {
    page.navigateTo();
    page.getMenuByNumber(1, 'a').click();
    page.getMenuByNumber(2, 'a').click();
    browser.waitForAngularEnabled(true);
    expect(page.getElementByClass('text-center', 0).getText()).toEqual('...');
    expect(page.getElementByClass('text-center', 1).getText()).toEqual('First name');
    expect(page.getElementByClass('text-center', 2).getText()).toEqual('Last name');
    expect(page.getElementByClass('text-center', 3).getText()).toEqual('Age');
    expect(page.getElementByClass('text-center', 4).getText()).toEqual('Grade');
    expect(page.getElementByClass('text-center', 5).getText()).toEqual('Address');
    expect(page.getElementByClass('text-center', 6).getText()).toEqual('workEligible');
    expect(page.getElementByClass('text-center', 7).getText()).toEqual('Date of birth');
  });


});
