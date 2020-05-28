# FlashCards Project

A React-native mobile application (Android or iOS - or both) that allows users to study collections of flashcards. The app will allow users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.

## TL;DR

To get started developing right away:

* expo-cli should be installed
* app is tested for android using expo app
* install all project dependencies with `npm install`
* start the development server with `npm start`
* scan QR code in expo app and app is starting...

## Demo
[https://snack.expo.io/@miteshtagadiya/mobile-flashcards](https://snack.expo.io/@miteshtagadiya/mobile-flashcards)

## App Structure
```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
└── components
|       ├── AddCard.js # Component to add new Card in deck
|       ├── AddDeck.js # Component to add new Deck
|       ├── Button.js # Button component to use across components
|       ├── Deck.js # Single Deck component to display Deck details
|       ├── DeckCard.js # DeckCard ui component contains title and numberof cards in deck
|       ├── DeckResult.js # A Component used to display Quiz result
|       ├── Decks.js # A Component that displays default screen contains list of decks
|       ├── Quiz.js # A Quiz component
└── components
|       ├── Data.js # Default JSON object of data
|       ├── database.js # All the apis to perform operations
└── App.js # root component
```
