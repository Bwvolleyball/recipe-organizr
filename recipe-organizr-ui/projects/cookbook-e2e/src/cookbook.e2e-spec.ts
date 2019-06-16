import { CookbookPage } from './cookbook.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: CookbookPage;

  beforeEach(() => {
    page = new CookbookPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Welcome to cookbook!');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
