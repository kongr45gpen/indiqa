import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useTracker } from 'meteor/react-meteor-data';
import { AdminQuestion } from './AdminQuestion';
import { QuestionsCollection } from '../db/QuestionsCollection';

export const Admin = () => {
  const newQuestions = useTracker(() => QuestionsCollection.find({ status: { $in: [ 'new' ]} }, {
    sort: [['createdAt', 'asc']]
  }).fetch());

  const approvedQuestions = useTracker(() => QuestionsCollection.find({ status: { $in: [ 'approved', 'spotlight' ]} }, {
    sort: [['votes', 'desc'], ['createdAt', 'asc']]
  }).fetch());

  const answeredQuestions = useTracker(() => QuestionsCollection.find({ status: { $in: [ 'answered' ]} }, {
    sort: [['answeredAt', 'asc']]
  }).fetch());

  const rejectedQuestions = useTracker(() => QuestionsCollection.find({ status: { $in: [ 'rejected' ]} }, {
    sort: [['createdAt', 'asc']]
  }).fetch());

  const user = useTracker(() => Meteor.user());

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  return user ? (
      <Fragment>
        <section>
          <p class="lead">Logged in as { user.username }</p>
          <div class="row">
            <div class="col-4">
              <h3 className="u-text-center"><i class="far fa-wrapper fa-plus-square"></i> New</h3>
              { newQuestions.map(question => <AdminQuestion key={ question._id} question={ question } />)}
            </div>
            <div class="col-4">
              <h3 className="u-text-center"><i class="fas fa-wrapper fa-check"></i> Approved</h3>
              { approvedQuestions.map(question => <AdminQuestion key={ question._id} question={ question } />)}
            </div>
            <div class="col-4">
              <h3 className="u-text-center"><i class="fas fa-wrapper fa-volume-up"></i> Answered</h3>
              { answeredQuestions.map(question => <AdminQuestion key={ question._id} question={ question } />)}
            </div>
          </div>
          <div>
            <h3 className=""><i class="fas fa-wrapper fa-crossmark"></i> Rejected</h3>
            <div class="row">
              { rejectedQuestions.map(question => <div className="col-4">
                <AdminQuestion key={ question._id} question={ question } /></div>)}
            </div>
          </div>
        </section>
      </Fragment>
    ) : (
      <div>You do not have access to this resource</div>
    );
};
