import { check } from 'meteor/check';
import { SessionsCollection } from '../db/SessionsCollection';

Meteor.methods({
  'sessions.create': function ({ name, active }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    check(name, String);
    check(active, Boolean);
    return SessionsCollection.insert({ name, active })
  },

  'sessions.update': function ({ _id, name, active }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const $set = {}
    if (name !== undefined) {
      check(name, String); 
      $set.name = name 
    }
    if (active !== undefined) { 
      check(active, Boolean);
      $set.active = active 
    }
    return SessionsCollection.update({ _id }, { $set });
  },

  'sessions.delete': function ({ _id }) {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    return SessionsCollection.remove({ _id })
  }
});