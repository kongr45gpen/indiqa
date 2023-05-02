import { Meteor } from 'meteor/meteor';
import { SessionsCollection } from '../db/SessionsCollection';

Meteor.publish('sessions.public', function publishSessions() {
  return SessionsCollection.find({ active: true });
});

Meteor.publish('sessions.admin', function publishSessions() {
  if (!this.userId) {
    throw new Meteor.Error('Not authorized.');
  }

  return SessionsCollection.find();
});