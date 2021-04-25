/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("validateLatestAndTopPicks", (promoNumber, position) => {
  cy.get(
    `[data-event-scroll-depth="hp-promo-1"] > .content-widget > .content-widget__${position} > `
  ).each((ele, rawIndex) => {
    let index = rawIndex;
    index += 1;
    cy.get(ele).should("be.visible");
    cy.get(
      `[data-event-scroll-depth="hp-promo-${promoNumber}"] > .content-widget > .content-widget__${position} > :nth-child(${index}) > .card-content > .lazyload-container > .card-content__img`
    ).should("exist");
    cy.get(
      `[data-event-scroll-depth="hp-promo-${promoNumber}"] > .content-widget > .content-widget__${position} > :nth-child(${index}) > .card-content > .card-content__title`
    ).should("be.visible");
    cy.get(
      `[data-event-scroll-depth="hp-promo-${promoNumber}"] > .content-widget > .content-widget__${position} > :nth-child(${index}) > .card-content > .card-content__teaser`
    ).should("exist");
    let cardContent = "Read Now »";
    if (promoNumber === "1") {
      cardContent = "Play Now »";
    }

    cy.get(
      `[data-event-scroll-depth="hp-promo-${promoNumber}"] > .content-widget > .content-widget__${position} > :nth-child(${index}) > .card-content > .mw-link`
    )
      .should("be.visible")
      .and("have.text", cardContent);
  });
});
