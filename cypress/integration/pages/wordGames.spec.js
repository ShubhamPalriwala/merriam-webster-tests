/* eslint-disable no-undef */
describe("Loads the Page and Tests the Heading", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Visits the /word-games page", () => {
    cy.visit("/word-games");
  });

  it("Validates the the heading", () => {
    cy.get(".section-title")
      .should("be.visible")
      .and("have.text", "Word Games and Quizzes");
  });
});

describe("Tests the article previews on the top of the page", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Validates the visibility of the previews", () => {
    cy.get(".recirc-bar").should("be.visible");
  });
  it("Validates the slicks in the bar", () => {
    cy.get(".recirc-bar > .bar-items > .slick-list > .slick-track > ").each(
      (slick, rawIndex) => {
        const index = rawIndex;
        if (index >= 8) {
          /*
          As the elements with index 8 - 14 are lazyloaded and only exist
          when the user explicitly wants to view them by sliding the slicks
          */
          return false;
        }
        cy.get(slick).should("exist");
        cy.get(
          `.recirc-bar > .bar-items > .slick-list > .slick-track > [data-slick-index="${index}"] > .img-link > .lazyload-container > .lazyloaded`
        ).should("exist");
        return null;
      }
    );
  });
  it("Validates the arrows in the slick bar", () => {
    cy.get(".slick-next.clone").should("exist");
    cy.get(".slick-prev.clone").should("exist");
    cy.get(".recirc-bar > :nth-child(1)").should("exist");
    cy.get(".recirc-bar > :nth-child(3)").should("exist");
  });
});

describe("Test the Weekly Challenge section", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Validates the underlying container", () => {
    cy.get(".weekly-challenge-area").should("be.visible");
  });

  it("Tests the Main challenge", () => {
    cy.get(".top").should("be.visible");
    cy.get(".activity-title")
      .should("be.visible")
      .and("contains.text", "Weekly Challenge");

    cy.get(".top > .img-link > .lazyload-container > .lazyloaded").should(
      "be.visible"
    );

    cy.get(".text-content > h5 > a")
      .should("be.visible")
      .and("contains.text", "Name that Thing: Flower Edition")
      .and("have.attr", "href", "/word-games/ntt-flowers-quiz");

    cy.get(".mell-gr235 > a")
      .should("be.visible")
      .and("contains.text", "Can you correctly identify these flowers?")
      .and("have.attr", "href", "/word-games/ntt-flowers-quiz");

    cy.get(".text-content").should("be.visible");

    cy.get(".main-action")
      .should("be.visible")
      .and("have.text", "Play Now")
      .and("have.attr", "href", "/word-games/ntt-flowers-quiz");

    cy.get(".social-bar > ul ").should("be.visible");
    cy.get(".social-bar > ul >").each((socialElement, rawIndex) => {
      let index = rawIndex;
      index += 1;
      cy.get(socialElement).should("be.visible");
      cy.get(`:nth-child(${index}) > .social-icon`)
        .should("be.visible")
        .and("have.attr", "href", "#");
    });
  });

  it("Tests the Other challenges", () => {
    cy.get(".chalenges-bar").should("be.visible");
    cy.get(".challenges-slider > .slick-list > .slick-track").should(
      "be.visible"
    );
    cy.get(
      ".challenges-slider > .slick-list > .slick-track > .slick-current"
    ).should("be.visible");

    cy.get(
      '.challenges-slider > .slick-list > .slick-track > [data-slick-index="1"]'
    ).should("exist");

    cy.get(".chalenges-bar > .slick-next").should("exist");
    cy.get(".chalenges-bar > .slick-prev").should("exist");
  });

  it("Tests the See all weekly challenges quiz heading", () => {
    cy.get(".see-all-link")
      .should("be.visible")
      .and("contains.text", "See All Weekly Challenge Quizzes");

    cy.get(".see-all-link > .arrow-link").should(
      "have.attr",
      "href",
      "/word-games/see-all"
    );
  });
});

describe("Validates the Featured Game section", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Tests the first featured game", () => {
    cy.get(".guest").should("be.visible");
    cy.get(".guest > .univ-section-sub-title")
      .should("be.visible")
      .and("contains.text", "Featured Game");

    cy.get(".guest > .featured-game-area-inner").should("be.visible");

    cy.get(".thumbnail").should("exist");

    cy.get(
      ".guest > .featured-game-area-inner > .col2 > .u-wgt-title-type4 > a"
    )
      .should("be.visible")
      .and("contains.text", "Typeshift")
      .and("have.attr", "href", "/word-games/typeshift");

    cy.get(".guest > .featured-game-area-inner > .col2 > .typo1")
      .should("be.visible")
      .and(
        "contains.text",
        "Anagram puzzles meet word search. A new, more difficult puzzle every day of the week."
      );

    cy.get(
      ".guest > .featured-game-area-inner > .col2 > .b-wrap > .b-wrap-l > .play-now-button"
    )
      .should("be.visible")
      .and("contains.text", "Play Now")
      .and("have.attr", "href", "/word-games/typeshift");

    cy.get(".typo2").should("be.visible").and("contains.text", "Your score");

    cy.get("#fgNotPlayed")
      .should("be.visible")
      .and(
        "contains.text",
        "You haven't played this game yet. Play every day for the longest streak!"
      );
  });

  it("Tests the second featured game", () => {
    cy.get("#featured-game-alphabear2 > .univ-section-sub-title")
      .should("be.visible")
      .and("contains.text", "Featured Game");

    cy.get("#featured-game-alphabear2").should("be.visible");

    cy.get("a > img").should("exist");

    cy.get(
      "#featured-game-alphabear2 > .featured-game-area-inner > .col2 > .u-wgt-title-type4 > a"
    )
      .should("be.visible")
      .and("have.text", "Alphabear 2")
      .and("have.attr", "href", "/word-games/alphabear2");

    cy.get(
      "#featured-game-alphabear2 > .featured-game-area-inner > .col2 > .typo1"
    )
      .should("be.visible")
      .and(
        "contains.text",
        "Spell words. Make bears. Spell more words. Make bigger bears."
      );

    cy.get(
      "#featured-game-alphabear2 > .featured-game-area-inner > .col2 > .b-wrap > .b-wrap-l > .play-now-button"
    )
      .should("be.visible")
      .and("contains.text", "Play Now")
      .and("have.attr", "href", "/word-games/alphabear2");
  });
});

describe("Validates the Popular Games and Quizzes section", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Tests the underlying container and the heading", () => {
    cy.get(".popular-quiz-area").should("be.visible");
    cy.get(".popular-quiz-area > .univ-section-sub-title")
      .should("be.visible")
      .and("contains.text", "Popular Games and Quizzes");
  });
  it("Tests the quizzes individually", () => {
    cy.get(".your-high-scores-display")
      .should("be.visible")
      .and(
        "contains.text",
        "To save your scores, you'll need to log in. After you play, your score will show up below."
      );
    cy.validateQuizzes("name-that-thing");
    cy.validateQuizzes("vocabulary");
    cy.validateQuizzes("spell-it");
    cy.validateQuizzes("true-or-false");
  });
});

describe("Validates the Crossword and Puzzles section", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Tests the underlying container and the heading", () => {
    cy.get(".games-additems-top-cont").should("be.visible");
    cy.get(".split-area-inliner > .univ-section-sub-title")
      .should("be.visible")
      .and("contains.text", "Crosswords, Puzzles, and More");
  });

  it("Tests the Crossword section", () => {
    cy.get(".split-area-inliner > :nth-child(3)").should("be.visible");

    cy.get(".split-area-inliner > :nth-child(3) > h4")
      .should("be.visible")
      .and("have.text", "Crosswords");

    cy.get(".split-area-inliner > :nth-child(3) > ").each(
      (crosswordContainer) => {
        let index = 2;
        const crosswordTitle = [
          "Jumble Crossword",
          "Universal Daily Crossword",
          "L.A. Times Daily Crossword",
        ];
        const crosswordDescription = [
          "Unscramble letters to solve each clue.",
          "A daily challenge for crossword fanatics and other puzzle lovers",
          "A new puzzle every day from the L.A. Times.",
        ];

        const crosswordUrl = [
          "/word-games/jumble-crossword",
          "/word-games/universal-daily-crossword",
          "/word-games/la-times-daily-crossword",
        ];

        if (index > 4) {
          return false;
        }
        cy.get(crosswordContainer).should("be.visible");
        cy.get(
          `.split-area-inliner > :nth-child(3) > :nth-child(${index}) > div`
        ).should("exist");
        cy.get(
          `:nth-child(3) > :nth-child(${index}) > div > :nth-child(1)`
        ).should("exist");

        cy.get(`:nth-child(3) > :nth-child(${index}) > div > h5 > a`)
          .should("be.visible")
          .and("have.text", crosswordTitle[index - 2])
          .and("have.attr", "href", crosswordUrl[index - 2]);

        cy.get(`:nth-child(3) > :nth-child(${index}) > div > p > a`)
          .should("be.visible")
          .and("have.text", crosswordDescription[index - 2])
          .and("have.attr", "href", crosswordUrl[index - 2]);

        index += 1;
        return null;
      }
    );
  });

  it("Tests the More Games section", () => {
    cy.get(":nth-child(4) > h4")
      .should("be.visible")
      .and("have.text", "More Games");

    cy.get(".more-games > ").each((gameContainer, rawIndex) => {
      let index = rawIndex;
      index += 1;
      const gameTitle = [
        "Daily Jumble (Jumble Classic)",
        "Word Roundup",
        "PlayFour!",
        "Up and Down Words",
        "KenKen",
        "Sudoku",
        "Lexigo",
      ];
      const gameDescription = [
        "Unscramble the words to complete the comic.",
        "Lasso the words that fit the clues and solve the puzzle.",
        "Complete the grid by forming four-letter words from the clues.",
        "Solve the word chain where each answer provides a clue to the next.",
        "Play this challenging math-based puzzle.",
        "Play a new logic puzzle every day.",
        "Find the hidden words in the letter tiles by solving the clues.",
      ];

      const gameUrl = [
        "/word-games/daily-jumble-classic",
        "/word-games/word-roundup",
        "/word-games/play-four",
        "/word-games/up-and-down-words",
        "/word-games/kenken",
        "/word-games/sudoku",
        "/word-games/lexigo",
      ];

      cy.get(gameContainer).should("be.visible");
      cy.get(`.more-games > :nth-child(${index}) > div`).should("exist");

      cy.get(`.more-games > :nth-child(${index}) > div > :nth-child(1)`).should(
        "exist"
      );

      cy.get(`.more-games > :nth-child(${index}) > div > h5 > a`)
        .should("be.visible")
        .and("have.text", gameTitle[index - 1])
        .and("have.attr", "href", gameUrl[index - 1]);

      cy.get(`.more-games > :nth-child(${index}) > div > p > a`)
        .should("be.visible")
        .and("have.text", gameDescription[index - 1])
        .and("have.attr", "href", gameUrl[index - 1]);

      index += 1;
    });
  });

  it("Tests the Missing Games section", () => {
    cy.get("#message-info").should("be.visible");
    cy.get('[width="20"] > path').should("be.visible");
    cy.get(".message-info__box--arrow > path").should("be.visible");

    cy.get(".message-info__box--headline")
      .should("be.visible")
      .and("contains.text", "IS YOUR GAME MISSING?")
      .click();

    cy.get(".message-info__content--text")
      .should("be.visible")
      .and(
        "contains.text",
        "Many of our games used Adobe Flash, but Adobe discontinued support. We'll be working on some pretty big changes over the next couple months. We're really excited about what we have in store and we hope you stick with us through this tough transition."
      );
  });
});

describe("Tests the right section of the page", () => {
  beforeEach(() => {
    cy.viewport("macbook-15");
  });

  it("Tests the Word of the Day section", () => {
    cy.get(".wotd-side").should("be.visible");
    cy.get(".wotd-side__title").should("be.visible");

    cy.get(".wotd-side__title > a")
      .should("be.visible")
      .and("contains.text", "WORD OF THE DAY")
      .and("have.attr", "href", "/word-of-the-day");

    cy.get(".wotd-side__headword > a").should("be.visible");

    cy.get(".wotd-side__link > a")
      .should("be.visible")
      .and("contains.text", "See Definitions and Examples")
      .and("have.attr", "href", "/word-of-the-day");

    cy.get(".wotd-side__subscribe__lead")
      .should("be.visible")
      .and("contains.text", "Get Word of the Day daily email!");

    cy.get(".wod-subscribe").should("be.visible");

    cy.get(".wod-submit").should("be.visible");
  });

  it("Tests the Trending now section", () => {
    cy.get(".wgt-wap-side-trending").should("be.visible");
    cy.get(".jc-wgt-title-type1 > a")
      .should("be.visible")
      .and("contains.text", "TRENDING NOW");

    cy.get("ol > ").each((trendingElement, rawIndex) => {
      let index = rawIndex;
      index += 1;
      cy.get(trendingElement).should("be.visible");
      cy.get(`ol > :nth-child(${index})`).should("be.visible");
      cy.get(`:nth-child(${index}) > .title > a > .tw-module-headword`).should(
        "be.visible"
      );
      cy.get(":nth-child(1) > .title > a > .tw-module-teaser").should(
        "be.visible"
      );
    });

    cy.get(".see-all-cnt > a")
      .should("be.visible")
      .and("contains.text", "SEE ALL");
  });
});
