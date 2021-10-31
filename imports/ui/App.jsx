import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { QuestionsCollection } from '../api/QuestionsCollection.js';
import { Question } from './Question.jsx';
import { QuestionForm } from './QuestionForm';

export const App = () => {
  const questions = useTracker(() => QuestionsCollection.find({}, {
    sort: [['votes', 'desc'], ['createdAt', 'asc']]
  }).fetch());

  return (
    <section>
      <div class="content">
        <h3>Ask your questions here!</h3>
        <QuestionForm />
        <h3>See other questions</h3>
        <section>
          { questions.map(question => <Question key={ question._id} question={ question } />)}
        </section>
      </div>
    </section>
  );
};
