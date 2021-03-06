import { AsyncStorage } from 'react-native'

const DECKS_STORAGE_KEY = 'mobile-flashcards'

export async function fetchDecksFromStorage() {
  let decksData = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
  return JSON.parse(decksData);
}

export async function saveDeckInStorage(deck) {
  await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck))
}

export async function saveCardInStorage(card, deckId) {
  const decksData = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
  const decks = JSON.parse(decksData)

  decks[deckId] = {
    ...decks[deckId],
    questions: [...decks[deckId].questions, card]
  }
  await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
}

export async function saveAllDecksInStorage(decks) {
  await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
}
