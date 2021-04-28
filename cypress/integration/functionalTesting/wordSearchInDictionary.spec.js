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

describe("Searching for a word in the dictionary", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Validates the visibilty of the underlying container", () => {
    cy.get(".v2-search-bar > .col-12").should("be.visible");
  });

  it("Validates the Search Box and it's buttons", () => {
    cy.get("#s-term").should("be.visible");
    cy.get(".nav-search-btn").should("be.visible");
    cy.get(".dictionary-tab")
      .should("be.visible")
      .and("have.text", "dictionary");
    cy.get(".thesaurus-tab").should("be.visible").and("have.text", "thesaurus");
  });

  it("Searches for a word", () => {
    cy.get("#s-term").should("be.visible").type(word);
    cy.get(".nav-search-btn").should("be.visible").click();
    cy.url().should("contain", `/dictionary/${word}`);
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
    cy.visit(`/dictionary/${word}`);
  });

  it("Tests the underlying container and the word", () => {
    cy.get("#left-content").should("be.visible");
    cy.get("#definition-right-rail").should("be.visible");
    cy.get("#left-content > :nth-child(2) > :nth-child(1)").should(
      "be.visible"
    );
    cy.get(":nth-child(2) > :nth-child(1) > .hword").should("have.text", word);
  });

  it("Tests the basic content of the page", () => {
    cy.get("#left-content > ").each((ele) => {
      cy.get(ele).should("exist");
    });
  });

  it("Tests the word specific content", () => {
    cy.get("#dictionary-entry-1 > ").each((ele) => {
      cy.get(ele).should("be.visible");
    });

    it("Tests the synonym box", () => {
      cy.get("#synonyms-anchor").should("be.visible");
      cy.get("#synonyms-anchor > h2")
        .should("be.visible")
        .and("contains.text", word);
    });
    cy.get("#synonyms-anchor > .widget-button").should("be.visible");
  });

  it("Tests the examples box", () => {
    cy.get("#examples-anchor").should("be.visible");
    cy.get("#examples-anchor > h2")
      .should("be.visible")
      .and("contains.text", word);

    cy.get("#examples-anchor >").each((ele) => {
      cy.get(ele).should("exist");
    });

    cy.get(".on-web > :nth-child(1)")
      .should("be.visible")
      .and("contains.text", "Recent Examples on the Web");

    cy.get("#on-web").should("be.visible");
  });

  it("Tests the First Known Use box", () => {
    cy.get("#first-known-anchor").should("be.visible");
    cy.get("#first-known-anchor > h2")
      .should("be.visible")
      .and("contains.text", word);
  });

  it("Tests the Learn More section", () => {
    cy.get(".learn-more-header")
      .should("be.visible")
      .and("contains.text", word);
  });
});
