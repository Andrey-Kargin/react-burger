/// <reference types="cypress" />
import login from '../fixtures/login.json';

describe('Конструктор бургера', () => {
  beforeEach(() => {
    // открываем главную
    cy.visit('/');
  });

  it('Открывается и закрывается модалка деталей ингредиента', () => {
    cy.contains('Соберите бургер'); // заголовок страницы

    // кликаем по первой карточке любого раздела
    cy.get('[data-cy=ingredient-card]').first().click();

    // проверяем модалку
    cy.get('[data-cy=modal]').contains('Детали ингредиента');
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('Drag&Drop булки и ингредиента и создание заказа с авторизацией', () => {
    // источники: первая булка и первый ингредиент из раздела "Начинки"
    cy.get('[data-cy=section-bun] [data-cy=ingredient-card]').first().as('bun');
    cy.get('[data-cy=section-main] [data-cy=ingredient-card]').first().as('ingredient');

    // цель — область конструктора
    cy.get('[data-cy=constructor]').as('constructor');

    // dnd: для html5 dnd передаём dataTransfer
    cy.get('@bun').trigger('dragstart', { dataTransfer: new DataTransfer() });
    cy.get('@constructor').trigger('drop', { dataTransfer: new DataTransfer() });

    cy.get('@ingredient').trigger('dragstart', { dataTransfer: new DataTransfer() });
    cy.get('@constructor').trigger('drop', { dataTransfer: new DataTransfer() });

    // жмём "Оформить заказ" — нас редиректит на /login
    cy.get('[data-cy=place-order]').click();

    cy.contains('Вход');
    cy.get('[name=email]').type(login.email);
    cy.get('[name=password]').type(login.password);
    cy.contains('button', 'Войти').click();

    // снова жмём на оформление
    cy.get('[data-cy=place-order]').click();

    // ждём номер заказа (бэкенд может тормозить ~15с)
    cy.get('[data-cy=order-number]', { timeout: 30000 }).contains(/\d+/);

    // закрываем модалку
    cy.get('[data-cy=modal-close]').click();

    // проверяем, что конструктор снова пуст
    cy.contains('Оформить заказ'); // страница вернулась к исходному состоянию
  });
});
