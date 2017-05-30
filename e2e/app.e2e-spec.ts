import { PePage } from './app.po';

describe('pe App', () => {
  let page: PePage;

  beforeEach(() => {
    page = new PePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
