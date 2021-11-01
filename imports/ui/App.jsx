import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
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
import { QuestionList } from './QuestionList.jsx';
import { Header } from './Header.jsx';

export const App = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <Router>
      <ToastContainer toastClassName='Toastify__toast-theme--colored' />
      { user && <Header /> }
      <Switch>
        <Route path="/login">
          <LoginForm />
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
          <QuestionList />
        </Route>
      </Switch>
    </Router>
  );
};
