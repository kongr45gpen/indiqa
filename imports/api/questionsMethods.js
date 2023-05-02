import { check } from 'meteor/check';
import { QuestionsCollection } from '../db/QuestionsCollection';
import { SessionsCollection } from '../db/SessionsCollection';

Meteor.methods({
  'questions.insert'(text) {
    check(text, String);

    QuestionsCollection.insert({
      text,
      createdAt: new Date,
      status: "new",
      votes: 0,
      session: SessionsCollection.getActiveSession()._id
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
        // TODO: Make this more elegant
        const spotLightedQuestions = QuestionsCollection.find({ status: {$eq: "spotlight"}}, {}).fetch();
          spotLightedQuestions.forEach((question) => {
            QuestionsCollection.update(question, {
              $set: {
                status: "approved"
              }
          });
        })
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