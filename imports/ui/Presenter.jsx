import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { toast } from 'react-toastify';
import { useTracker } from 'meteor/react-meteor-data';
import { QuestionsCollection } from '../db/QuestionsCollection';
import { PresenterQuestion } from './PresenterQuestion';
import FlipMove from 'react-flip-move';

export const Presenter = () => {
  const { approvedQuestions } = useTracker(() => {
    Meteor.subscribe('questions.public');

    const approvedQuestions = QuestionsCollection.getActiveQuestions();

    return { approvedQuestions };
  });


  const user = useTracker(() => Meteor.user());

  return user ? (
      <Fragment>
        <section>
          <FlipMove>
            { approvedQuestions.map(question => <PresenterQuestion key={ question._id} question={ question } />)}
          </FlipMove>
        </section>
      </Fragment>
    ) : (
      <div>You do not have access to this resource</div>
    );
};
