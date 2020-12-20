import { AsyncStorage } from 'react-native'
import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'

const NOTIFICATION_KEY = 'mobile-flashcards-notify'

export function createDeck(deckTitle) {
  return {
    [deckTitle]: {
      title: deckTitle,
      questions: []
    }
  }
}

export function createCard(question, answer) {
  return { question, answer }
}

export function getDummyData() {
  return {
    SportsCars: {
      title: 'Sports Cars',
      questions: [
        {
          question: 'What is the most expensive new car in the world?',
          answer: 'Bugatti La Voiture Noire'
        },
        {
          question: 'What is the horsepower of the LaFerrari?',
          answer: '950hp'
        },
        {
          question: 'Which manufacturerer holds the 0-300-0 record?',
          answer:
            'Koenigsegg'
        }
      ]
    },
    Tech: {
      title: 'Tech',
      questions: [
        {
          question: 'Does apple make their own laptop CPUs now?',
          answer: 'Yes, it is currently called the M1'
        },
        {
          question: 'Which company makes the RTX 3080?',
          answer: 'Nvidia'
        },
      ]
    },
    Food: {
      title: 'Food',
      questions: [
        {
          question: 'What is the best diet?',
          answer: 'Eat what you want when you want :)'
        },
        {
          question: 'Oranges have the most vitamin C',
          answer: 'No, lemons have more'
        },
        {
          question: 'Banting?',
          answer: 'Nope'
        },
        {
          question: 'How many meals per day?',
          answer: 'As many as I want'
        }
      ]
    }
  }
}

function createNotification() {
  return {
    title: 'Time to study',
    body: '📖 You have not studied today',
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  };
}

//I copied this part from the udacifitness app
export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync()
  )
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse).then((data) => {
      if(data === null){
        Permissions.askAsync(Permissions.NOTIFICATIONS).then((status) => {
          if (status === 'granted'){

            Notifications.cancelAllScheduledNotificationsAsync()

            Notifications.setNotificationHandler({
              handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: false,
              }),
            });

            Notifications.scheduleNotificationAsync({
              content: {
                title: 'Time to study',
                body: '📖 You have not studied today'
              },
              trigger: {
                hour: 18,
                minute: 30,
                repeats: true
              }
            })

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
      }
    }
  )
}
