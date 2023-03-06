import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { toast } from 'react-toastify';
import { useTracker } from 'meteor/react-meteor-data';
import { QuestionsCollection } from '../db/QuestionsCollection';
import { PresenterQuestion } from './PresenterQuestion';
import FlipMove from 'react-flip-move';
import { questionMachine } from '../state/questionState';

export const Streaming = () => {
  const { spotlighted } = useTracker(() => {
    Meteor.subscribe('questions.public');

    return { spotlighted: QuestionsCollection.findOne({ status: 'spotlight'}) };
  });


  return <Fragment>
      { spotlighted &&
        <div class="u-absolute u-top-0 w-screen h-screen">
          <aside class="frame my-4 streaming__question animated fadeIn" id={ spotlighted._id }>
            { spotlighted.text }
          </aside>
        </div>
      }
      </Fragment>;

};
