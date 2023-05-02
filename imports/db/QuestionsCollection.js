import { Mongo } from 'meteor/mongo';
import { SessionsCollection } from './SessionsCollection';

export const QuestionsCollection = new Mongo.Collection('questions');

export const questionsWithSession = function() {
    const activeSessions = SessionsCollection.find({ active: true }).fetch()
      .map(s => s._id);

    const sessionFilter = {
      $or: [{ session: null }, { session: { $in: activeSessions } }],
    }

    return sessionFilter;
}

QuestionsCollection.getActiveQuestions = function() {
    const spotlight = this.findOne({ status: 'spotlight', ...questionsWithSession() });
    const approved = this.find({ status: { $in: [ 'approved' ]}, ...questionsWithSession() }, {
        sort: [['votes', 'desc'], ['createdAt', 'asc']]
    }).fetch();

    if (spotlight) {
        return [ spotlight ].concat(approved);
    } else {
        return approved;
    }
}

QuestionsCollection.getQuestionsFromSession = function({ _id }) {
    return QuestionsCollection.find({  session: _id }).fetch();
}