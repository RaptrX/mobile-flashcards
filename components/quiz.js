import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, voodoo_blue, mediumGrey, red, lizard_green } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

class Quiz extends Component {
  state = {
    score: 0,
    currentQuestionId: 0,
    shouldShowQuestion: true,
  }

  handleFlipCard = () => {
    this.setState((currState) => ({
      shouldShowQuestion: !currState.shouldShowQuestion
    }))
  }

  handleResponse = (isCorrect) => {
    if (isCorrect === true) {
      this.setState((currState) => ({
        score: currState.score + 1,
      }))
    }

    this.setState((currState) => ({
      currentQuestionId: currState.currentQuestionId + 1,
      shouldShowQuestion: true
    }))
  }

  render() {
    const { navigation, deck } = this.props
    const { currentQuestionId, shouldShowQuestion, score } = this.state
    const card = deck.questions[currentQuestionId]

    let finalScore = 0
    if (deck.questions.length !== 0 && score > 0) {
      finalScore =
        Math.floor((score / deck.questions.length) * 100)
    }

    if (!deck) {
      return (
        <View style={style.container}>
          <Text>Loading...</Text>
        </View>
      )
    }

    if (currentQuestionId === deck.questions.length){
      clearLocalNotification().then(setLocalNotification())
    }

    return(
      <View style={{flex: 1}}>
      {currentQuestionId !== deck.questions.length ?
        (
          <View style={styles.container}>
            <Text style={{fontSize: 24, alignSelf: 'center'}}>{deck.title} Quiz</Text>
            <Text style={{fontSize: 18, alignSelf: 'center'}}>
              Question: {currentQuestionId + 1} of {deck.questions.length}
            </Text>
            <View style={{height:1, borderColor: voodoo_blue, borderWidth: 1, margin: 16}}/>
            <View style={styles.card}>
            {
              shouldShowQuestion === true ?
              (
                <Text style={styles.heading}>{card.question}</Text>
              ) : (
                <Text style={{fontSize: 18, alignSelf: 'center', textAlign: 'center'}}>{card.answer}</Text>
              )
            }
            </View>
            <View style={styles.buttonBox}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.handleFlipCard}>
                <Text style={styles.buttonText}>{shouldShowQuestion === true ? 'SHOW ANSWER' : 'SHOW QUESTION'}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {borderColor: lizard_green}]}
                onPress={() => {this.handleResponse(true)}}>
                <Text style={styles.buttonText}>CORRECT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {borderColor: red}]}
                onPress={() => {this.handleResponse(false)}}>
                <Text style={styles.buttonText}>INCORRECT</Text>
              </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.container}>
              <Text style={{fontSize: 24, alignSelf: 'center'}}>{deck.title} Quiz</Text>
              <Text style={{fontSize: 18, alignSelf: 'center'}}>Total questions {deck.questions.length}</Text>
              <View style={{height:1, borderColor: voodoo_blue, borderWidth: 1, margin: 16}}/>
              <View style={styles.card}>
                <Text style={styles.heading}>You scored</Text>
                <Text style={{fontSize: 48, alignSelf: 'center', textAlign: 'center'}}>{finalScore}%</Text>
              </View>
              <View style={styles.buttonBox}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {this.setState(() => ({
                    score: 0,
                    currentQuestionId: 0,
                  }))}}>
                  <Text style={styles.buttonText}>RESTART QUIZ</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {navigation.navigate('Deck')}}>
                  <Text style={styles.buttonText}>DONE</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }
      </View>
    )
  }
}

const mapStateToProps = (decks, ownProps) => {
  const { deckId } = ownProps.navigation.state.params
  const deck = decks[deckId]
  return { deck }
};

export default connect(mapStateToProps)(Quiz)

export const styles = StyleSheet.create({
  genericTextContainer: {
    padding: 20
  },
  container:{
    flex: 1,
    padding: 16,
    backgroundColor: white,
    justifyContent: 'space-between'
  },
  buttonBox: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  flashcardsButton: {
    marginBottom: 10,
    width: 200,
    backgroundColor: "black"
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
    flex: 3,
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
  heading:{
    fontSize: 24,
    alignSelf: 'center',
    textAlign: 'center',
  },
});
