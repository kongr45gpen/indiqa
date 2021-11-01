import { Meteor } from 'meteor/meteor';
import { QuestionsCollection } from '/imports/db/QuestionsCollection';

Meteor.publish('questions.public', function publishQuestions() {
  return QuestionsCollection.find({ status: { $not: { $in: [ 'rejected', 'new' ] }} });
});

Meteor.publish('questions.admin', function publishQuestions() {
  if (!this.userId) {
    throw new Meteor.Error('Not authorized.');
  }

  return QuestionsCollection.find();
});