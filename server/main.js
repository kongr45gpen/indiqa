import { Meteor } from 'meteor/meteor';
import { QuestionsCollection } from '../imports/db/QuestionsCollection';
import '/imports/api/questionsMethods'

const insertQuestion = questionText => QuestionsCollection.insert({ text: questionText });

Meteor.startup(() => {
  if (QuestionsCollection.find().count() === 0) {
    [
      'First Question',
      'Second Question',
      'Third Question',
      'Fourth Question',
      'Fifth Question',
      'Sixth Question',
      'Seventh Question'
    ].forEach(insertQuestion)
  }
});
