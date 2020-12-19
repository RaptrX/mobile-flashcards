import React, { Component } from 'react'
import { KeyboardAvoidingView, View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, voodoo_blue, mediumGrey } from '../utils/colors'
import { saveDeckInStorage } from '../utils/api'
import { createDeck } from '../utils/helpers'
import { addDeck } from '../actions'

class AddDeck extends Component {
  state = {
    deckTitle: ''
  }

  onChangeText = (deckTitle) => {
    this.setState(() => ({
      deckTitle
    }))
  }

  handleAddDeck = () => {
    const { deckTitle } = this.state
    const { navigate } = this.props.navigation
    const { addDeck } = this.props
    const deck = createDeck(deckTitle)

    if (!deckTitle) {
      alert('We need to know what to call the deck')
      return
    }

    const { decks } = this.props
    if (decks[deckTitle]) {
      alert('Nope, try again... A bit more original this time :)')
      return
    }

    saveDeckInStorage(deck).then(addDeck(deck))

    this.setState(() => ({
      deckTitle: ''
    }))

    navigate("Deck", { deckId: deckTitle })
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <Text style={{fontSize: 24, alignSelf: 'center'}}>Create a new deck</Text>
          <View style={{height:1, borderColor: voodoo_blue, borderWidth: 1, margin: 16}}/>
          <View style={styles.buttonBox}>
            <TextInput
              placeholder='Enter a title'
              value={this.state.deckTitle}
              onChangeText={this.onChangeText}
              style={{fontSize: 18, alignSelf: 'center', textAlign: 'center', flex: 1}}/>
            <TouchableOpacity
              style={styles.button}
              onPress={this.handleAddDeck}>
              <Text style={styles.buttonText}>ADD DECK</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const mapStateToProps = (decks) => {
  return { decks }
}

export default connect(mapStateToProps,{ addDeck })(AddDeck)

export const styles = StyleSheet.create({
  container:{
    flex: 10,
    padding: 16,
    backgroundColor: white,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonBox: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
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
  card: {
    flex: 5,
    backgroundColor: white,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    color: 'black',
    fontSize: 20,
    textAlign: 'center'
  },
});
