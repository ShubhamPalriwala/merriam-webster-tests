/* eslint-disable no-undef */

describe("Tests the Navigation Bar", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });
  it("Visits the index page", () => {
    cy.visit("/");
  });

  it("Validates the Merriam-Websiter Logo", () => {
    cy.get(
      '[d="M0 20.5291C0 9.20443 9.20999 0.0291138 20.5723 0.0291138C31.9347 0.0291138 41 9.20881 41 20.5291C41 31.8538 31.9347 41.0291 20.5723 41.0291C9.21437 41.0335 0 31.8538 0 20.5291Z"]'
    ).should("be.visible");
  });

  it('Validates the "Since" in the header', () => {
    cy.get(".since1828-text").should("be.visible").and("have.text", "SINCE");
  });

  it('Validates the "1828" in the header', () => {
    cy.get(".since1828-num").should("be.visible").and("have.text", "1828");
  });

  it("Validates the visibility of the underlying header component", () => {
    cy.get(".shrinkheader").should("be.visible");
  });

  it("Validates the visibility of the navigation bar", () => {
    cy.get(".link-bar").should("be.visible");
  });

  it("Validates the visibility of the left side of the navigation bar", () => {
    cy.get(".link-bar-l").should("be.visible");
  });

  it("Validates the buttons in the nav-bar", () => {
    cy.get(".link-bar-l > ").each((ele, index) => {
      const navBarText = Cypress.env("header")["nav-bar-text"];
      const navBarUrl = Cypress.env("header")["nav-bar-url"];
      cy.get(ele)
        .should("be.visible")
        .and("have.text", navBarText[index])
        .and("have.attr", "href", navBarUrl[index]);
    });
  });

  it("Validates the visibility of the links on the right side of the navigation bar", () => {
    cy.get(".link-bar-r > .ul-login-links").should("be.visible");
  });

  it("Validates the log-in button", () => {
    cy.get(".link-bar-r > .ul-login-links > :nth-child(1) > a")
      .should("be.visible")
      .and("have.text", "LOG IN")
      .and("have.attr", "href", "/login");
  });

  it("Validates the register button", () => {
    cy.get(".ul-login-links > :nth-child(2) > a")
      .should("be.visible")
      .and("have.text", "REGISTER")
      .and("have.attr", "href", "/register");
  });

  it("Validates the saved-words button", () => {
    cy.get(":nth-child(5) > .ul-favorites")
      .should("be.visible")
      .and("contains.text", "SAVED WORDS")
      .and("have.attr", "href", "/saved-words");
  });
});

describe("Tests the Search for a Word Section", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Validates the visibilty of the underlying container", () => {
    cy.get(".v2-search-bar > .col-12").should("be.visible");
  });

  it("Validates the 'Search for a word' heading", () => {
    cy.contains("Search for a Word").should("be.visible");
  });

  it("Validates the Search Box and it's buttons", () => {
    cy.get("#s-term").should("be.visible");
    cy.get(".nav-search-btn").should("be.visible");
    cy.get(".dictionary-tab")
      .should("be.visible")
      .and("have.text", "dictionary");
    cy.get(".thesaurus-tab").should("be.visible").and("have.text", "thesaurus");
  });

  it("Validates the 'Suggested searches' heading", () => {
    cy.get("#suggested-searches")
      .should("be.visible")
      .and("contains.text", "Suggested searches: ");
  });
});

describe("Tests the Register-Now Section", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Validates the visibilty of the underlying container", () => {
    cy.get("#register-promo").should("be.visible");
  });

  it("Validates the heading", () => {
    cy.get(".register-promo__text")
      .should("be.visible")
      .and(
        "contains.text",
        "Word nerds! Save words plus keep track of all your lookups"
      );
  });

  it("Validates the anchor tag and the link", () => {
    cy.get(".register-promo__link > .section__header__peripheral-link")
      .should("be.visible")
      .and("have.text", "REGISTER NOW »")
      .and("have.attr", "href", "/register");
  });
});

describe("Tests the Word of the Day Section", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Validates the visibilty of the underlying container", () => {
    cy.get(":nth-child(7) > .container > .row > :nth-child(1)").should(
      "be.visible"
    );
  });

  it("Validates the heading", () => {
    cy.get(".wotd-promo__header__title")
      .should("be.visible")
      .and("have.text", "Word of the Day")
      .and("have.attr", "href", "/word-of-the-day");

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const d = new Date();
    const month = months[d.getMonth()].toUpperCase();
    const date = d.getDate();
    const year = d.getFullYear();
    const todaysDate = `${month} ${date}, ${year}`;

    cy.get(".wotd-promo__header__date")
      .should("be.visible")
      .and("have.text", todaysDate);
  });

  it("Validates the subheading under the word", () => {
    cy.get(".wotd-promo__body__link")
      .should("be.visible")
      .and("have.text", "Get the definition, examples, and podcast »")
      .and("have.attr", "href", "/word-of-the-day");
  });

  it("Validates the get-word-in-your-inbox sub-section", () => {
    cy.get("#wotd-promo-sub-box").should("be.visible");
    cy.get(".wotd-promo__subscribe__lead")
      .should("be.visible")
      .and("contains.text", "Get Word of the Day in your inbox!");

    cy.get(".wotd-promo__subscribe__form__email")
      .should("be.visible")
      .type(Cypress.env("EMAIL"));
    cy.contains("Sign Up").should("be.visible").click({ force: true });

    cy.get(".subscribed-msg")
      .should("be.visible")
      .and("have.text", "Thank you for subscribing!");
  });
});

describe("Tests the Top Lookups Section", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Validates the visibilty of the underlying container", () => {
    cy.get(":nth-child(7) > .container > .row > :nth-child(2)").should(
      "be.visible"
    );
    cy.get(".top-lookup-now").should("be.visible");
  });

  it("Validates the heading", () => {
    cy.get(".top-lookup-now__header")
      .should("be.visible")
      .and("have.text", "Top Lookups Right Now");

    cy.get('.topten-refresh-timer > [style=""]')
      .should("be.visible")
      .and("contains.text", "Next refresh:");
  });

  it("Validates the top ten words", () => {
    cy.get(".topten").should("be.visible");

    for (let index = 1; index < 11; index += 1) {
      cy.get(`:nth-child(${index}) > .word-text`).should("be.visible");
    }
  });
});

describe("Tests the Games and Quizzes Section", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Validates the visibilty of the underlying container", () => {
    cy.get('[data-event-scroll-depth="hp-promo-1"] > .content-widget').should(
      "be.visible"
    );
  });

  it("Validates the heading", () => {
    cy.get(
      '[data-event-scroll-depth="hp-promo-1"] > .section__header > .col > .header-md'
    )
      .should("be.visible")
      .and("contains.text", "Games & Quizzes");

    cy.get(
      '[data-event-scroll-depth="hp-promo-1"] > .section__header > .col-md-4 > .section__header__peripheral-link'
    )
      .should("be.visible")
      .and("have.text", "See More Games »");
  });

  it("Validates the Latest games and Top Picks", () => {
    /* As the latest games are updated frequently
    so am not hardcoding anything in the checks here */
    cy.get(
      '[data-event-scroll-depth="hp-promo-1"] > .content-widget > :nth-child(1)'
    )
      .should("be.visible")
      .and("have.text", "Latest");

    cy.get(
      '[data-event-scroll-depth="hp-promo-1"] > .content-widget > .content-widget__spacer'
    )
      .should("be.visible")
      .and("have.text", "Top Picks");

    for (let index = 1; index <= 2; index += 1) {
      const position = index === 1 ? "top" : "bottom";
      cy.validateLatestAndTopPicks("1", position);
    }
  });
});

describe("Tests the From The Editors Section", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Validates the visibilty of the underlying container", () => {
    cy.get('[data-event-scroll-depth="hp-promo-2"]').should("be.visible");
  });

  it("Validates the heading", () => {
    cy.get(
      '[data-event-scroll-depth="hp-promo-2"] > .section__header > .col > .header-md'
    )
      .should("be.visible")
      .and("contains.text", "From the Editors");

    cy.get(
      '[data-event-scroll-depth="hp-promo-2"] > .section__header > .col-md-4 > .section__header__peripheral-link'
    )
      .should("be.visible")
      .and("have.text", "See More »");
  });

  it("Validates the Top Picks & Latest Articles", () => {
    cy.get(
      '[data-event-scroll-depth="hp-promo-2"] > .content-widget > :nth-child(1)'
    )
      .should("be.visible")
      .and("have.text", "Latest");

    cy.get(
      '[data-event-scroll-depth="hp-promo-2"] > .content-widget > .content-widget__spacer'
    )
      .should("be.visible")
      .and("have.text", "Top Picks");

    for (let index = 1; index <= 2; index += 1) {
      const position = index === 1 ? "top" : "bottom";
      cy.validateLatestAndTopPicks("2", position);
    }
  });
});

describe("Tests the Merriam-Webster Topics section", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Validates the visibilty of the underlying container", () => {
    cy.get(".section--topics").should("be.visible");
  });

  it("Validates the heading", () => {
    cy.get(
      ".section--topics > .container > .section__header > .col > .header-md-wht"
    )
      .should("be.visible")
      .and("contains.text", "Merriam-Webster Topics");

    cy.get(
      ".section--topics > .container > .section__header > .col-md-4 > .section__header__peripheral-link"
    )
      .should("be.visible")
      .and("have.text", "See More Topics »");
  });

  it("Validates the Grammar & Usage column", () => {
    cy.get('[href="/topics/grammar-and-usage"]').should("be.visible");
    cy.get('[href="/topics/grammar-and-usage"] > .topics__item__title')
      .should("be.visible")
      .and("have.text", "Grammar & Usage");
    cy.get(
      '[href="/topics/grammar-and-usage"] > .topics__item__title--accent'
    ).should("be.visible");
    cy.get('[href="/topics/grammar-and-usage"] > .topics__item__text')
      .should("be.visible")
      .and(
        "have.text",
        "i.e. (or is it e.g.?) Grammar Rules and Commonly Confused Words"
      );
  });

  it("Validates the Words We're watching column", () => {
    cy.get('[href="/topics/words-were-watching"]').should("be.visible");
    cy.get('[href="/topics/words-were-watching"] > .topics__item__title')
      .should("be.visible")
      .and("have.text", "Words We're Watching");
    cy.get(
      '[href="/topics/words-were-watching"] > .topics__item__title--accent'
    ).should("be.visible");
    cy.get('[href="/topics/words-were-watching"] > .topics__item__text')
      .should("be.visible")
      .and(
        "have.text",
        "They're not in the dictionary yet. But they're on our radar."
      );
  });

  it("Validates the Learn new words with Puku column", () => {
    cy.get('[href="/topics/puku-vocabulary-resources"]').should("be.visible");
    cy.get('[href="/topics/puku-vocabulary-resources"] > .topics__item__title')
      .should("be.visible")
      .and("have.text", "Learn New Words with Puku");
    cy.get(
      '[href="/topics/puku-vocabulary-resources"] > .topics__item__title--accent'
    ).should("be.visible");
    cy.get('[href="/topics/puku-vocabulary-resources"] > .topics__item__text')
      .should("be.visible")
      .and(
        "have.text",
        "Vocabulary lists, activities, lessons, and other resources for kids ages 8-12"
      );
  });
});

describe("Tests the Vocabulary and Learning Section", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Validates the visibilty of the underlying container", () => {
    cy.get('[data-event-scroll-depth="hp-promo-4"]').should("be.visible");
  });

  it("Validates the heading", () => {
    cy.get(
      '[data-event-scroll-depth="hp-promo-4"] > .section__header > .col > .header-md'
    )
      .should("be.visible")
      .and("contains.text", "Vocabulary & Learning");

    cy.get(
      '[data-event-scroll-depth="hp-promo-2"] > .section__header > .col-md-4 > .section__header__peripheral-link'
    )
      .should("be.visible")
      .and("have.text", "See More »");
  });

  it("Validates the Latest and the Top Picks section", () => {
    cy.get(
      '[data-event-scroll-depth="hp-promo-4"] > .content-widget > :nth-child(1)'
    )
      .should("be.visible")
      .and("have.text", "Latest");

    cy.get(
      '[data-event-scroll-depth="hp-promo-4"] > .content-widget > .content-widget__spacer'
    )
      .should("be.visible")
      .and("have.text", "Top Picks");

    for (let index = 1; index <= 2; index += 1) {
      const position = index === 1 ? "top" : "bottom";
      cy.validateLatestAndTopPicks("4", position);
    }
  });
});

describe("Tests the Videos Section", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Validates the visibilty of the underlying container", () => {
    cy.get(".section--videos").should("be.visible");
  });

  it("Validates the heading", () => {
    cy.get(
      ".section--videos > .container > .section__header > .col > .header-md-wht"
    )
      .should("be.visible")
      .and("contains.text", "Videos");

    cy.get(
      ".section--videos > .container > .section__header > .col-md-4 > .section__header__peripheral-link"
    )
      .should("be.visible")
      .and("have.text", "See More Videos »");
  });

  it("Validates the Video Player", () => {
    cy.get(".video__player").should("be.visible");
    cy.get(".video__player__link")
      .should("be.visible")
      .and("have.attr", "href", "#");
    cy.get(".video__player > .subheader-sm-wht")
      .should("be.visible")
      .and("have.text", "'All over sudden' vs. \"All of a sudden\"")
      .and(
        "have.attr",
        "href",
        "/video/is-it-all-over-sudden-or-all-of-a-sudden-video"
      );
  });

  it("Validates the other smaller video containers", () => {
    cy.get(".video-list > :nth-child(1)").should("be.visible");
    cy.get(".video-list > :nth-child(1) >").each((ele, index) => {
      cy.get(ele).should("be.visible");
      cy.get(`[data-video-index=${index}]`).should("be.visible");
      cy.get(
        `[data-video-index=${index}] > .row > .video__list__item__image__wrapper > .lazyload-container `
      ).should("exist");
      cy.get(
        `[data-video-index=${index}] > .row > .text-content > .subheader-sm-wht`
      ).should("be.visible");
    });
  });
});

describe("Tests the Time traveller section", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Validates the visibilty of the underlying container", () => {
    cy.get(".time-traveler").should("be.visible");
    cy.get(".time-traveler-container").should("be.visible");
  });

  it("Validates the heading", () => {
    cy.get(".time-traveler__logo__image")
      .should("be.visible")
      .and("have.attr", "alt", "Time Traveler");

    cy.get(".time-traveler__text")
      .should("be.visible")
      .and("have.text", "Find words from the year you were born … and beyond!");
  });

  it("Validates the input box", () => {
    cy.get("#select2-time-traveler-years-container").should("be.visible");
  });
});

describe("Tests the Apps from Merriam-Webster section", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Validates the visibilty of the underlying container", () => {
    cy.get(".section--apps").should("be.visible");
  });

  it("Validates the heading", () => {
    cy.get(".section--apps > .section__header > .col > .header-md")
      .should("be.visible")
      .and("contains.text", "Apps from Merriam-Webster");
  });

  it("Tests both the apps individually", () => {
    cy.get(".section--apps > :nth-child(2) > ")
      .should("be.visible")
      .each((ele, rawindex) => {
        let index = rawindex;
        index += 1;
        const appHeading =
          index === 1 ? "Merriam-Webster Dictionary" : "Puku: Learn New Words";
        const appInfo =
          index === 1
            ? "Take America's most trusted dictionary wherever you go"
            : "For kids 8-12";
        cy.get(ele).should("be.visible");
        cy.get(`.section--apps > :nth-child(2) > :nth-child(${index})`).should(
          "be.visible"
        );
        cy.get(
          `.section--apps > :nth-child(2) > :nth-child(${index}) > :nth-child(1) > .views-card-static--card-img`
        ).should("exist");
        cy.get(
          `.section--apps > :nth-child(2) > :nth-child(${index}) > .views-card-static--subheader`
        )
          .should("be.visible")
          .and("have.text", appHeading);

        cy.get(
          `.section--apps > :nth-child(2) > :nth-child(${index}) > .views-card-static--body-copy`
        )
          .should("be.visible")
          .and("have.text", appInfo);
      });
    cy.get(
      '[href="https://itunes.apple.com/us/app/merriam-webster-dictionary/id399452287?mt=8"] > .lazyload-container > .app-links__img'
    ).should("exist");
    cy.get(
      '[href="https://play.google.com/store/apps/details?id=com.merriamwebster"] > .lazyload-container > .app-links__img'
    ).should("exist");
    cy.get(
      '[href="https://apps.apple.com/us/app/puku-learn-new-words/id1460784777?ls=1"] > .lazyload-container > .app-links__img'
    ).should("exist");
    cy.get(
      '[href="https://play.google.com/store/apps/details?id=com.mw.qmd"] > .lazyload-container > .app-links__img'
    ).should("exist");
  });
});

describe("Tests the Podcasts section", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Validates the visibility of the underlying container", () => {
    cy.get(".section-spacer").should("be.visible");
  });

  it("Validates both the podcasts individually", () => {
    cy.get(".section-spacer > :nth-child(2) > ").each((ele, rawIndex) => {
      let index = rawIndex;
      index += 1;
      const podcastHeading = index === 1 ? "Word of the Day" : "Word Matters";
      const podcastInfo =
        index === 1
          ? "From the fun and familiar to the strange and obscure, learn something new everyday with Merriam-Webster"
          : "Join Merriam-Webster editors as they challenge supposed grammar rules, reveal the surprising origins behind words, tackle common questions, and generally geek out about the beautiful nightmare that is language.";

      cy.get(ele).should("be.visible");
      cy.get(
        `.section-spacer > :nth-child(2) > :nth-child(${index}) > .lazyload-container > .views-card-static--card-img`
      ).should("exist");
      cy.get(
        `.section-spacer > :nth-child(2) > :nth-child(${index}) > .views-card-static--subheader`
      )
        .should("be.visible")
        .and("have.text", podcastHeading);
      cy.get(
        `.section-spacer > :nth-child(2) > :nth-child(${index}) > .views-card-static--body-copy`
      )
        .should("be.visible")
        .and("have.text", podcastInfo);
    });
    cy.get(":nth-child(1) > .views-card-static--card-links > .ul-button")
      .should("be.visible")
      .and(
        "have.attr",
        "href",
        "https://art19.com/shows/merriam-websters-word-of-the-day"
      );
    cy.get(
      '[href="https://podcasts.apple.com/us/podcast/word-matters/id1526498402"] > .ul-action-text'
    ).should("be.visible");
    cy.get(
      '[href="https://podcasts.apple.com/us/podcast/word-matters/id1526498402"] > .ul-action-text'
    ).should("be.visible");
  });
});

describe("Tests the Browse by dictionary/thesaurus section", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Validates the visibility of the underlying container", () => {
    cy.get('[data-event-scroll-depth="hp-browse"]').should("be.visible");
  });

  it("Validates both the sections individually by checking the heading and the alphabets", () => {
    for (let index = 1; index <= 2; index += 1) {
      const heading = index === 1 ? "Dictionary" : "Thesaurus";

      const alphanumerics = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "0-9",
      ];
      cy.get(
        `.browse--${heading.toLowerCase()} > .browse__letters > .row > .col > .header-md`
      )
        .should("be.visible")
        .and("contains.text", `Browse the ${heading}`);

      for (let letterIndex = 2; letterIndex <= 28; letterIndex += 1) {
        cy.get(
          `.browse--${heading.toLowerCase()} > .browse__letters > :nth-child(${letterIndex})`
        )
          .should("be.visible")
          .and("contains.text", alphanumerics[letterIndex - 2]);
      }
    }
  });
});

describe("Tests the Footer of the page", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Validates the visibility of the footer container", () => {
    cy.get(".global-footer").should("be.visible");
  });

  it("Validates the Footer Logo", () => {
    cy.get(".footer-logo").should("have.attr", "href", "/");
  });

  it("Validates the Subscribe For More block", () => {
    cy.get(".footer-subscribe-block").should("be.visible");

    cy.get(".footer-subscribe-msg > p")
      .should("be.visible")
      .and("have.text", "Learn a new word every day. Delivered to your inbox!");

    cy.get(".footer-subscribe-field")
      .should("be.visible")
      .type(Cypress.env("EMAIL"));
    cy.get('[aria-label="Subscribe"]').click({ force: true });
    cy.get(".subscribed-msg").should("be.visible");
  });

  it("Validates other merriam-webster dictionaries URLs", () => {
    cy.get(".other-dictionaries > ").each(() => {
      let outerIndex = 0;
      outerIndex += 1;
      const footerText =
        outerIndex === 1
          ? Cypress.env("footer")["other-dictionaries"]
          : Cypress.env("footer")["translation-dictionaries"];

      const footerUrl =
        outerIndex === 1
          ? Cypress.env("footer")["other-dictionaries-url"]
          : Cypress.env("footer")["translation-dictionaries-url"];

      cy.get(`.other-dictionaries > :nth-child(${outerIndex}) > `).each(() => {
        let innerIndex = 0;
        innerIndex += 1;
        cy.get(
          `.other-dictionaries > :nth-child(${outerIndex}) > :nth-child(${innerIndex}) > a`
        )
          .should("be.visible")
          .and("have.text", footerText[innerIndex - 1])
          .and("have.attr", "href", footerUrl[innerIndex - 1]);
      });
    });
  });

  it("Validates the Social Links section", () => {
    const socialUrls = Cypress.env("footer")["social-urls"];

    cy.get(".follow-us > p").should("have.text", "FOLLOW US");
    cy.get(".follow-links > ul > li").each(() => {
      let index = 0;
      index += 1;
      cy.get(`:nth-child(${index}) > .social-link`)
        .should("be.visible")
        .and("have.attr", "href", socialUrls[index - 1]);
    });
  });

  it("Validates the visibility of the lower section of the footer", () => {
    cy.get(".footer-foot").should("be.visible");
  });

  it("Validates the Lists at the lower section of the footer", () => {
    cy.get(".clearfix > ul > ").each((_para, rawOuterIndex) => {
      let outerIndex = rawOuterIndex;
      if (outerIndex >= 2) {
        return false;
      }
      outerIndex += 1;
      const footerText =
        outerIndex === 1
          ? Cypress.env("footer")["clearfix-text"]
          : Cypress.env("footer")["browse-text"];

      const footerUrl =
        outerIndex === 1
          ? Cypress.env("footer")["clearfix-url"]
          : Cypress.env("footer")["browse-url"];

      cy.get(`.clearfix > :nth-child(${outerIndex}) > `).each(
        (_innerPara, rawInnerIndex) => {
          let innerIndex = rawInnerIndex;
          innerIndex += 1;
          cy.get(
            `.clearfix > :nth-child(${outerIndex}) > :nth-child(${innerIndex}) > a`
          )
            .should("be.visible")
            .and("have.text", footerText[innerIndex - 1])
            .and("have.attr", "href", footerUrl[innerIndex - 1]);
          if (outerIndex === 1 && innerIndex >= 18) return false;
          if (outerIndex === 2 && innerIndex >= 3) return false;
          /*
          The above if else had to be used as the page had hidden :nth-childs
          which weren't and were affecting the automation of the tests
          */
          return null;
        }
      );
      return null;
    });
  });

  it("Validates the content under the list", () => {
    cy.get(".footer-foot > .clearfix > .footer-foot-content > p")
      .should("be.visible")
      .and(
        "have.text",
        "No other dictionary matches M-W's accuracy and scholarship in defining word meanings. Our pronunciation help, synonyms, usage and grammar tips set the standard. Go beyond dictionary lookups with Word of the Day, facts and observations on language, lookup trends, and wordplay from the editors at Merriam-Webster Dictionary."
      );
  });

  it("Validates the copyright footer", () => {
    cy.get(".copyright")
      .should("be.visible")
      .and("have.text", "© 2021 Merriam-Webster, Incorporated");
  });
});
