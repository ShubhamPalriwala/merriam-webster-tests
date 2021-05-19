# Cypress Tests on Merriam-Webster

Started implementing as a task for Wikimedia's GSOC 2021 Proposal,<br/>
Might end up implementing as a project to learn cypress thoroughly.<br/><br/>
The website that is tested can be found [here](https://www.merriam-webster.com/)

## Key Features:

### Static Testing

    - Validates each and every word and URL on the navbar as well as footer
    - In depth testing of the index page as well as the word-games page
    - Validates the date with today's date for the word of the day
    - Validates each of the containers on the pages before going for in-depth testing
    - Structutal Ordered testing allows to tackle the problem of lazy loading of content in an efficient way without the use of any external libraries

### Functional Testing

- Searching for a word in a dictionary:
  - Chooses a random word and searches it in the dictionary and thesaurus from the index page
  - The URL should match the `/dictionary/${word}` regex
  - The redirected page should have the word's meaning
  - Should have it's synonyms, examples, first-usage, and learn more section
- Searching for a word in a thesaurus:
  - Chooses a random word and searches it in the thesaurus from the index page
  - The URL should match the `/thesaurus/${word}` regex
  - The redirected page should have the word specific content (very dynamic) and the learn more section
- Login Page:
  - Tests the static page and it's components
  - Takes your credentials from .env file and logs you in
  - Tests that the index page should now be customised to you

### Future Work

- I liked writing tests on merriam-webster as they have a lot of content generated dynamically.
- I will be now working on the testing of their API calls and their response validation
- I am thinking of writing tests that can validate if the Ads are visible to the user or not

## Utils

- Setup linter
- Init .env.template to be filled locally and renamed to `env` before functional testing with your merriam-webster credentials

#### Update: Did not make it to GSOC '21 but until next time! <br/>

