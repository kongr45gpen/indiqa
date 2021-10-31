import { check } from 'meteor/check';
import { QuestionsCollection } from './QuestionsCollection';

Meteor.methods({
  'questions.insert'(text) {
    check(text, String);

    // if (!this.userId) {
    //   throw new Meteor.Error('Not authorized.');
    // }

    QuestionsCollection.insert({
      text,
      createdAt: new Date,
      status: "new",
      votes: 0
    })
  },

  'questions.vote'(taskId) {
    check(taskId, String);

    // if (!this.userId) {
    //   throw new Meteor.Error('Not authorized.');
    // }

    TasksCollection.update(taskId, {
        $set: {
          votes: 1
        }
    });
  },

  'tasks.setIsChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    // if (!this.userId) {
    //   throw new Meteor.Error('Not authorized.');
    // }

    TasksCollection.update(taskId, {
      $set: {
        votes: 1
      }
    });
  }
});