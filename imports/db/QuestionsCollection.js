import { Mongo } from 'meteor/mongo';

export const QuestionsCollection = new Mongo.Collection('questions');

QuestionsCollection.getActiveQuestions = function() {
    console.log("HELLO. I HAVE BEEN CALLED!")

    const spotlight = QuestionsCollection.findOne({ status: 'spotlight' });
    const approved = QuestionsCollection.find({ status: { $in: [ 'approved' ]} }, {
        sort: [['votes', 'desc'], ['createdAt', 'asc']]
    }).fetch()

    if (spotlight) {
        return [ spotlight ].concat(approved);
    } else {
        return approved;
    }
}