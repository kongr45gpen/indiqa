import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { QuestionsCollection } from '../imports/db/QuestionsCollection';
import { randomBytes } from 'crypto';
import '/imports/api/questionsMethods';
import '/imports/api/questionsPublications';
import '/imports/api/sessionsMethods';
import '/imports/api/sessionsPublications';

const insertQuestion = questionText => QuestionsCollection.insert({ text: questionText });

Meteor.startup(() => {
  if (!Accounts.findUserByUsername('admin')) {
    const password = Buffer.from(randomBytes(12)).toString('base64');

    console.log("Creating admin user with password " + password + ". Make sure to change the password before using in production.");

    Accounts.createUser({
      username: 'admin',
      password,
    });
  }
});
