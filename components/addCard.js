import React, { Component } from 'react'
import { KeyboardAvoidingView, TextInput, View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { white, voodoo_blue, mediumGrey } from '../utils/colors'
import { saveCardInStorage } from '../utils/api'
import { createCard } from '../utils/helpers'
import { addCard } from '../actions'

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  onChangeTextQuestion = (question) => {
    this.setState(() => ({
      question,
    }));
  }

  onChangeTextAnswer = (answer) => {
    this.setState(() => ({
      answer,
    }))
  }

  handleAddCard = () => {
    const { deckId } = this.props.navigation.state.params;
    const { question, answer } = this.state;
    const { addCard } = this.props
    const { goBack } = this.props.navigation

    if (!question || !answer) {
      alert('Question and Answer Required')
    } else {
      const card = createCard(question, answer)
      saveCardInStorage(card, deckId).then(addCard(card, deckId)).then(goBack())
    }
  }

  render() {
    const { deckId } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <Text style={{fontSize: 24, alignSelf: 'center', textAlign: 'center'}}>Create a new card in:</Text>
          <Text style={{fontSize: 24, alignSelf: 'center', textAlign: 'center'}}>{deckId}</Text>
          <View style={{height:1, borderColor: voodoo_blue, borderWidth: 1, margin: 16}}/>
          <View style={styles.buttonBox}>
            <View style={{flex: 1}}/>
            <TextInput
              placeholder='Enter a question'
              value={this.state.deckTitle}
              onChangeText={this.onChangeTextQuestion}
              style={{fontSize: 18, alignSelf: 'center', textAlign: 'center', marginBottom: 16}}/>
            <TextInput
              placeholder='Enter an answer'
              value={this.state.deckTitle}
              onChangeText={this.onChangeTextAnswer}
              style={{fontSize: 18, alignSelf: 'center', textAlign: 'center'}}/>
            <View style={{flex: 1}}/>
            <TouchableOpacity
              style={styles.button}
              onPress={this.handleAddCard}>
              <Text style={styles.buttonText}>ADD CARD</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

export default connect(null,{ addCard })(AddCard)

export const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 16,
    backgroundColor: white,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonBox: {
    flex: 8,
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
  buttonText:{
    color: 'black',
    fontSize: 20,
    textAlign: 'center'
  },
});
