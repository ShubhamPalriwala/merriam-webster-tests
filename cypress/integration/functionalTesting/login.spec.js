/* eslint-disable no-undef */

describe("Loads the login page", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });
  it("Visits the login page", () => {
    cy.forceVisit("/login");
  });
});

describe("Logs you in and checks the functionality", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Validates the heading and the underlying containers", () => {
    cy.get("#user-sign-in").should("be.visible");
    cy.get(".row").should("be.visible");
    cy.get(".ul-header").should("be.visible").and("have.text", "Log in");
    cy.get(".ul-info").should("be.visible").and("have.text", "OR REGISTER >");
  });

  it("Validates the Login Box and the submit button", () => {
    cy.get(".ul-form-email > .ul-label")
      .should("be.visible")
      .and("have.text", "Email/Username");

    cy.get(".ul-fg-password > .ul-label")
      .should("be.visible")
      .and("have.text", "Password");

    cy.get(".ul-link")
      .should("be.visible")
      .and("have.text", "Forgot password?")
      .and("have.attr", "href", "/forgot-password");
  });

  it("Enters your credentials", () => {
    cy.get("#ul-email").type(Cypress.env("LOGIN_EMAIL"));
    cy.get("#ul-password").type(Cypress.env("LOGIN_PASSWORD"));

    cy.get("#ul-login").click();
    cy.url().should("contain", `/`);

    cy.get(".ul-link-settings > .ul-username")
      .should("be.visible")
      .and("have.text", Cypress.env("LOGIN_USERNAME"));
  });

  it("Tests the username of the user on the page", () => {
    cy.get(".ul-link-settings > .ul-username")
      .should("be.visible")
      .and("have.text", Cypress.env("LOGIN_USERNAME"));

    cy.get("#register-promo")
      .should("be.visible")
      .and("contains.text", `Hello, ${Cypress.env("LOGIN_USERNAME")}`);
  });
});
