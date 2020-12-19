import React from 'react'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Constants from 'expo-constants'
import { createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { clearLocalNotification, setLocalNotification } from './utils/helpers'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import reducer from './reducers'
import Decks from './components/decks'
import Deck from './components/deck'
import AddDeck from './components/addDeck'
import AddCard from './components/addCard'
import Quiz from './components/quiz'
import { white, miami_blue, voodoo_blue } from './utils/colors'

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
    }
  },
}, {
  navigationOptions: { headerShown: false },
  tabBarOptions: {
    activeTintColor: miami_blue,
    inactiveTintColor: voodoo_blue,
    style: {
      height: 56,
      backgroundColor: white,
      shadowRadius: 6,
      shadowOpacity: 1,
      shadowColor: 'rgba(0,0,0,0.3)',
      shadowOffset: {
        width: 0,
        height: 5,
      },
    }
  },
})

const MainNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: voodoo_blue,
      },
      title: 'Deck'
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: voodoo_blue,
      },
      title: 'Add Card'
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: voodoo_blue,
      },
      title: 'Quiz'
    },
  },
}))

function FlashcardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <FlashcardsStatusBar
            backgroundColor={voodoo_blue}
            barStyle='light-content'
          />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
