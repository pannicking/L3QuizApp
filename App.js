import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, Alert, ToastAndroid, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/FontAwesome6";

const QuestionBox = ({ label, image, options, selectedValue, onValueChange }) => {
  return (
      <ScrollView style={styles.questionBox}>
        <View style={styles.questionTextContainer}>
          <Text style={styles.questionText}>{label}</Text>
        </View>
        <Image source={image} style={styles.image} />
        <RNPickerSelect
            onValueChange={onValueChange}
            items={options.map(option => ({ label: option, value: option }))}
            value={selectedValue}
            placeholder={{ label: 'Select an answer', value: null }}
        />
      </ScrollView>
  );
};

const App = () => {
  const questions = [
    {
      label: 'What animal is this?',
      image: require('./img/elephant.jpg'),
      options: ['Elephant', 'Tiger', 'Zebra'],
      correctAnswer: 'Elephant',
    },
    {
      label: 'What animal is this?',
      image: require('./img/leopard.jpg'),
      options: ['Giraffe', 'Leopard', 'Deer'],
      correctAnswer: 'Leopard',
    },
    {
      label: 'What bird is this?',
      image: require('./img/peacock.jpg'),
      options: ['Hummingbird', 'Kingfisher', 'Peacock'],
      correctAnswer: 'Peacock',
    },
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleAnswerChange = (value, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    const score = calculateScore();
    Alert.alert(`You have ${score} correct answer(s)!`);
  };

  return (
      <ScrollView style={[styles.container, styles.backgroundColor]}>
        <StatusBar hidden={true} />
        <Icon name={"paw"} size={20} color={'#808080'}><Text>Pann's Quiz</Text></Icon>
        {questions.map((question, index) => (
            <QuestionBox
                key={index}
                label={question.label}
                image={question.image}
                options={question.options}
                selectedValue={answers[index]}
                onValueChange={(value) => handleAnswerChange(value, index)}
            />
        ))}
        <Button title="Submit Answers" onPress={handleSubmit} />
        <TouchableOpacity onPress={() => ToastAndroid.show("Good luck!", ToastAndroid.SHORT)}>
          <Text style={styles.touchableText}>Good Luck!</Text>
        </TouchableOpacity>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  questionBox: {
    marginBottom: 20,
    marginTop: 10, //add space to top of the box
    backgroundColor: 'white',
    padding: 10, //to create space between content and box
    borderRadius: 8, //rounds the edges
  },

  // for the border and bg styling
  questionTextContainer: {
    borderWidth: 1,
    borderColor: '#0099AA',
    borderRadius: 5,  //  rounded corners for the border
    padding: 5,       // spacing between the text and the border
    marginBottom: 10,
    backgroundColor: 'skyblue', //colour within the border
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  touchableText: {
    textAlign: 'center',
    color: 'blue',
    marginTop: 10,
    fontSize: 16,

  },
  backgroundColor: {
    backgroundColor: '#e6f7ff',
  },
});

export default App;
