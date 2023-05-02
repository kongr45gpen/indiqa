import { Mongo } from 'meteor/mongo';

export const SessionsCollection = new Mongo.Collection('sessions');

SessionsCollection.getActiveSession = () => {
    return SessionsCollection.findOne({ active: true });
}