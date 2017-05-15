import { ImpostersPage } from './app.po';

describe('imposters App', () => {
  let page: ImpostersPage;

  beforeEach(() => {
    page = new ImpostersPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
