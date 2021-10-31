import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { QuestionsCollection } from '../db/QuestionsCollection.js';
import { Question } from './Question.jsx';
import { QuestionForm } from './QuestionForm';
import { LoginForm } from './LoginForm.jsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Admin } from './Admin.jsx';
import { Presenter } from './Presenter.jsx';

export const App = () => {
  const onlyApprovedFilter = {
    status: { $in: [ 'approved', 'answered', 'spotlight' ]}
  }

  const questions = useTracker(() => QuestionsCollection.find(onlyApprovedFilter, {
    sort: [ ['status', 'desc'], ['votes', 'desc'], ['createdAt', 'asc']]
  }).fetch());

  return (
    <Router>
      <ToastContainer toastClassName='Toastify__toast-theme--colored' />
      <Switch>
        <Route path="/login">
          <div className="content">
            <LoginForm />
          </div>
        </Route>
        <Route path="/admin">
          <div className="p-1">
            <Admin />
          </div>
        </Route>
        <Route path="/presenter">
          <div className="content">
            <Presenter />
          </div>
        </Route>
        <Route path="/">
          <section>
            <div className="content">
              <h3>Ask your questions here!</h3>
              <QuestionForm />
              <h3>See other questions</h3>
              <section>
                { questions.map(question => <Question key={ question._id} question={ question } />)}
              </section>
            </div>
          </section>
          </Route>
      </Switch>
    </Router>
  );
};
