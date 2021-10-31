import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { QuestionsCollection } from '../api/QuestionsCollection.js';
import { Question } from './Question.jsx';
import { QuestionForm } from './QuestionForm';

export const App = () => {
  const questions = useTracker(() => QuestionsCollection.find({}).fetch());

  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      <ul>
        { questions.map(question => <Question key={ question._id} question={ question } />)}
      </ul>
      <QuestionForm />
    </div>
  );
};
