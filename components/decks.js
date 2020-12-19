import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView, TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { fetchDecksFromStorage, saveAllDecksInStorage } from '../utils/api'
import { loadDecks } from '../actions'
import { getDummyData } from '../utils/helpers'
import { white, voodoo_blue, mediumGrey } from '../utils/colors'

class Decks extends Component {
  state = {
    ready: false
  }

  async componentDidMount() {

    const { loadDecks } = this.props

    let decks = await fetchDecksFromStorage()
    if (decks === null) {
      await saveAllDecksInStorage(getDummyData())
      decks = await fetchDecksFromStorage()
    }

    loadDecks(decks)

    this.setState(() => ({
      ready: true
    }))
  }

  handleOnPress = deckId => {
    const { navigate } = this.props.navigation
    navigate("Deck", { deckId })
  }

  render() {
    if (!this.state.ready) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    const { decks } = this.props

    return (
      <ScrollView style={{backgroundColor: white}}>
        {Object.keys(decks).map(deckId => {
          const deck = decks[deckId]
          const cardsText = deck.questions.length === 1 ? 'card' : 'cards'
          return (
            <TouchableOpacity
              key={deckId}
              style={{flex:1}}
              onPress={() => this.handleOnPress(deckId)}>
              <View style={styles.card}>
                <Text style={styles.heading}>{deck.title}</Text>
                <Text style={styles.subtext}>
                  {deck.questions.length} {cardsText}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}

const mapStateToProps = decks => {
  // console.log("mapStateToProps decks", decks);
  return { decks }
};

export default connect(mapStateToProps,{ loadDecks })(Decks)

const styles = StyleSheet.create({
  card: {
    backgroundColor: white,
    flex: 1,
    padding: 16,
    marginTop: 16,
    marginLeft: 16,
    marginRight: 16,
    borderWidth: 2,
    borderColor: voodoo_blue,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 5,
    justifyContent: 'flex-start',
    shadowRadius: 6,
    shadowOpacity: 1,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
  },
  heading:{
    fontSize: 20,
    color: 'black'
  },
  subtext:{
    fontSize: 16,
    color: mediumGrey,
  },
})
