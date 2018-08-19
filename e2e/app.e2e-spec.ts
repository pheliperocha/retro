import { AppPage } from './app.po';

describe('retrospective-desktop App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display a login button', () => {
    page.navigateTo();
    expect(page.getButtonText()).toEqual('Acessar com Linkedin');
  });
});
