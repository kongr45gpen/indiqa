import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { QuestionsCollection } from '../api/QuestionsCollection.js';
import { Question } from './Question.jsx';
import { QuestionForm } from './QuestionForm';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const onlyApprovedFilter = {
    status: { $in: [ 'approved', 'answered', 'new' ]}
  }

  const questions = useTracker(() => QuestionsCollection.find(onlyApprovedFilter, {
    sort: [ ['status', 'desc'], ['votes', 'desc'], ['createdAt', 'asc']]
  }).fetch());

  return (
    <section>
      <ToastContainer toastClassName='Toastify__toast-theme--colored' />
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
