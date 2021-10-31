import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { toast } from 'react-toastify';
import { useTracker } from 'meteor/react-meteor-data';
import { QuestionsCollection } from '../db/QuestionsCollection';
import { PresenterQuestion } from './PresenterQuestion';

export const Presenter = () => {
  const spotlightQuestions = useTracker(() => QuestionsCollection.find({ status: { $in: [ 'spotlight' ]} }, {
    sort: [['votes', 'desc'], ['createdAt', 'asc']]
  }).fetch());

  const approvedQuestions = useTracker(() => QuestionsCollection.find({ status: { $in: [ 'approved' ]} }, {
    sort: [['votes', 'desc'], ['createdAt', 'asc']]
  }).fetch());


  const user = useTracker(() => Meteor.user());

  return user ? (
      <Fragment>
        { spotlightQuestions && (
          <section>
            { spotlightQuestions.map(question => <PresenterQuestion key={ question._id} question={ question } />)}
            <div class="divider my-10"></div>
          </section>
        )}
        <section>
          { approvedQuestions.map(question => <PresenterQuestion key={ question._id} question={ question } />)}
        </section>
      </Fragment>
    ) : (
      <div>You do not have access to this resource</div>
    );
};
