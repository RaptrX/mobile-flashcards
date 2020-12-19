import React, { Component } from 'react'
import { Alert, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { white, voodoo_blue, mediumGrey } from '../utils/colors'

class Deck extends Component {
  handleAddCard = () => {
    const { navigate } = this.props.navigation
    const { deckId } = this.props.navigation.state.params
    navigate('AddCard', { deckId: deckId })
  }

  handleStartQuiz = () => {
    const { navigation, deck } = this.props
    const { navigate } = navigation
    const { deckId } = navigation.state.params

    if (deck.questions.length < 1) {
      alert('There are no cards in the deck')
    } else {
      navigate('Quiz', { deckId: deckId })
    }
  }

  render() {
    const { deck } = this.props
    const cardsText = deck.questions.length === 1 ? 'card' : 'cards'

    if (!deck) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.heading}>{deck.title}</Text>
          <View style={{height:1, borderColor: voodoo_blue, borderWidth: 1, margin: 16}}/>
        </View>
        <Text style={styles.subtext}>
          {deck.questions.length} {cardsText}
        </Text>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleAddCard}>
            <Text style={styles.buttonText}>ADD CARD</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleStartQuiz}>
            <Text style={styles.buttonText}>START QUIZ</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (decks, ownProps) => {
  const { deckId } = ownProps.navigation.state.params;
  const deck = decks[deckId];
  return { deck };
};

export default connect(mapStateToProps)(Deck)



const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 16,
    backgroundColor: white,
    justifyContent: 'space-between'
  },
  button:{
    marginTop: 16,
    backgroundColor: white,
    padding: 16,
    borderWidth: 2,
    minWidth: 200,
    borderColor: voodoo_blue,
    borderRadius: 5,
    height: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    color: 'black',
    fontSize: 20,
    textAlign: 'center'
  },
  heading:{
    alignSelf: 'center',
    fontSize: 24,
    color: 'black'
  },
  subtext:{
    alignSelf: 'center',
    fontSize: 18,
  },
})
