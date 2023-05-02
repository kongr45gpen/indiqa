import { Meteor } from 'meteor/meteor';
import { SessionsCollection } from '../db/SessionsCollection';
import { QuestionsCollection } from '/imports/db/QuestionsCollection';

Meteor.publish('questions.public', function publishQuestions() {
  this.autorun(function (computation) {

    const activeSessions = SessionsCollection
      .find({ active: true }, { fields: { _id: 1 } })
      .fetch()
      .map(s => s._id);

    return QuestionsCollection.find({
      status: { $not: { $in: ['rejected', 'new'] } },
      $or: [{ session: null }, { session: { $in: activeSessions } }]
    });

  });
});

Meteor.publish('questions.admin', function publishQuestions() {
  if (!this.userId) {
    throw new Meteor.Error('Not authorized.');
  }

  return QuestionsCollection.find();
});