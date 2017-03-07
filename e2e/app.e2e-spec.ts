import { GastosWithNetPage } from './app.po';

describe('gastos-with-net App', function() {
  let page: GastosWithNetPage;

  beforeEach(() => {
    page = new GastosWithNetPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
