/* eslint-disable no-undef */
import randomWords from "random-words";

const word = randomWords();

describe("Loads the index page", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });
  it("Visits the index page", () => {
    cy.visit("/");
  });
});

describe("Searching for a word in the thesaurus", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Validates the visibilty of the underlying container", () => {
    cy.get(".v2-search-bar > .col-12").should("be.visible");
  });

  it("Searches for a word", () => {
    cy.get("#s-term")
      .should("be.visible")
      .type(word)
      .then(() => {
        cy.get("#s-term")
          .type("{esc}")
          .then(() => {
            cy.get(".thesaurus-tab").should("be.visible");
          });
      });
    cy.get("#s-term").type("{esc}");

    cy.get(".thesaurus-tab").should("be.visible").click({ force: true });

    cy.url().should("contain", `/thesaurus/${word}`);
  });
});

describe("Validates the redirected page", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  /*
      This had to be done as the webpage reloaded the page thus it loaded
      a good number of scripts that were failing to load due to the time constraint.
  
      This is the same page as before as we checked the URL in the last test
      and we're loading that same one again.
    */
  it("Visits the page again", () => {
    cy.visit(`/thesaurus/${word}`);
  });

  it("Tests the underlying container and the word", () => {
    cy.get("#left-content").should("be.visible");
    cy.get("#definition-right-rail").should("be.visible");
    cy.get(".header-thesaurus")
      .should("be.visible")
      .and("have.text", "Thesaurus");
    cy.get(":nth-child(4) > :nth-child(1) > .hword").should("have.text", word);
  });

  it("Tests the basic content of the page", () => {
    cy.get("#left-content > ").each((ele) => {
      cy.get(ele).should("exist");
    });
  });

  it("Tests the word specific content", () => {
    cy.get("#thesaurus-entry-1 > ").each((ele) => {
      cy.get(ele).should("be.visible");
    });

    cy.get(".hword").should("be.visible").and("contains.text", word);

    cy.get("#thesaurus-entry-1 > .row > .col > .subheader-md")
      .should("be.visible")
      .and("contains.text", word);
  });

  it("Tests the Learn More section", () => {
    cy.get(".learn-more-header")
      .should("be.visible")
      .and("contains.text", word);
  });
});
