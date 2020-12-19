# Udacity ReactND Project - Mobile Flashcards

This app is the final project required for the Udacity React Nanodegree program, it has been tested on two devices Samsung S10 and Apple iPhone 11 using Expo.

The app is similar to typical index cards used for studying, except a digitized version. It allows the user to new create decks and add cards to existing deks. Each deck contains a set of cards with a question and an answer. 

The user can quiz themselves on each deck and receive a score at the end.

A scheduled notification is shown everyday at 16:30 if the user hasn't attempted at least one quiz question for that day.

## Installation

You need to have npm/yarn installed
Cloning or download the project
Extract and cd to the project folder
Run ```yarn install```
Run ```yarn start``` or ```expo start```

### Decks

Decks view is also the home view, once you start the app you get the default Decks view. The first time you run the app, you will get 3 decks created by default:

- Sports Cars
- Tech
- Food

Feel free to add your own.

### Add Deck

You can create your own decks by selecting the Add Deck tab. Once a deck is created you are directed to the deck screen so you can add cards to the new deck.

### Individual Deck

Selecting a deck from the decks list will take you to the individual deck view.

Where you can:
- Add a card to the deck
- Start a quiz

Each card consists of:
- a question
- an answer

### Quiz

Quiz can be started if there is at least one card in the deck, the quiz will run through all the cards in the deck and then give you a score. Users can flip the card to mark whether they were correct. After completing all the questions, you will see your score
