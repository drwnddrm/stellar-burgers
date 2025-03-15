const bun = '[data-cy="data-bun"]';
const main = '[data-cy="data-main"]';
const sauce = '[data-cy="data-sauce"]';
const ingredients = '[data-cy="burger-ingredients"]';
const bunUp = '[data-cy="burger-bun-up"]';
const bunDown = '[data-cy="burger-bun-down"]';
const modal = '[data-cy="modal"]';
const overlay = '[data-cy="overlay"]';
const closeButton = '[data-cy="close-btn"]';
const orderBurger = '[data-cy="order-burger"]';

describe('Проверка работы страницы конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('Проверка добавления ингредиентов в конструктор', () => {
    cy.get(bun).should('exist').find('button').click();
    cy.get(sauce).should('exist').find('button').click();
    cy.get(main).should('exist').find('button').click();

    cy.get(bunUp).contains('Краторная булка N-200i').should('exist');
    cy.get(bunDown).contains('Краторная булка N-200i').should('exist');
    cy.get(ingredients).contains('Соус Spicy-X').should('exist');
    cy.get(ingredients)
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('exist');
  });

  it('Проверка открытия модального окна ингредиента', () => {
    cy.get(main).should('exist').click();

    cy.get(modal).should('be.visible');

    cy.get(modal)
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('exist');

    cy.get(closeButton).should('exist');
  });

  it('Проверка закрытия модального окна ингредиента по нажатию на кнопку "Закрыть" ', () => {
    cy.get(main).should('exist').click();

    cy.get(closeButton).should('exist').click();
    cy.get(modal).should('not.exist');
  });

  it('Проверка закрытия модального окна ингредиента по нажатию на оверлей', () => {
    cy.get(main).should('exist').click();

    cy.get(overlay).should('exist').click({ force: true });
    cy.get(modal).should('not.exist');
  });
});

describe('Проверка создания заказа на странице конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );

    cy.intercept('POST', '/api/orders', { fixture: 'order.json' }).as(
      'postOrder'
    );

    cy.setCookie('accessToken', 'test-access');
    localStorage.setItem('refreshToken', 'test-refresh');

    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('Проверка создания заказа, закрытия модального окна и очистки конструктора', () => {
    cy.get(bun).should('exist').find('button').click();
    cy.get(sauce).should('exist').find('button').click();
    cy.get(main).should('exist').find('button').click();

    cy.get(bunUp).contains('Краторная булка N-200i').should('exist');
    cy.get(bunDown).contains('Краторная булка N-200i').should('exist');
    cy.get(ingredients).contains('Соус Spicy-X').should('exist');
    cy.get(ingredients)
      .contains('Филе Люминесцентного тетраодонтимформа')
      .should('exist');

    cy.get(orderBurger).find('button').should('exist').click();
    cy.wait('@postOrder');

    cy.get(modal).should('be.visible').contains('71074');
    cy.get(modal).find('button').should('exist').click().should('not.exist');

    cy.get(bunUp).should('not.exist');

    cy.get(bunDown).should('not.exist');

    cy.get(ingredients).contains('Выберите начинку').should('exist');

    cy.get(orderBurger).find('p').should('exist').contains('0').should('exist');
  });
});
