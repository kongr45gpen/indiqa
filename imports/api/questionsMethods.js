import { check } from 'meteor/check';
import { QuestionsCollection } from '../db/QuestionsCollection';

Meteor.methods({
  'questions.insert'(text) {
    check(text, String);

    QuestionsCollection.insert({
      text,
      createdAt: new Date,
      status: "new",
      votes: 0
    })
  },

  'questions.vote'(questionId) {
    check(questionId, String);

    QuestionsCollection.update(questionId, {
        $inc: {
          votes: 1
        }
    });
  },

  'questions.setStatus'(questionId, newStatus) {
    check(questionId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    if (newStatus == "spotlight") {
        // Only one question should be spotlighted by the presenter
        const spotLightedQuestions = QuestionsCollection.find({ status: {$eq: "spotlight"}}, {}).fetch();

        QuestionsCollection.update(questionId, {
            $set: {
              status: "approved"
            }
        });
    }

    QuestionsCollection.update(questionId, {
      $set: {
        status: newStatus
      }
    });
  },

  'questions.setResponse'(questionId, response) {
    check(questionId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    QuestionsCollection.update(questionId, {
      $set: {
        response
      }
    });
  }
});