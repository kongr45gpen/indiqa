import { Meteor } from 'meteor/meteor';
import React, { useState, useRef, Fragment } from 'react';
import { toast } from 'react-toastify';
import { useTracker } from 'meteor/react-meteor-data';
import { QuestionsCollection } from '../db/QuestionsCollection';
import { PresenterQuestion } from './PresenterQuestion';
import FlipMove from 'react-flip-move';
import { questionMachine } from '../state/questionState';
import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';

export const Streaming = () => {
  const nodeRef = useRef(null);

  const { spotlighted } = useTracker(() => {
    Meteor.subscribe('questions.public');

    return { spotlighted: QuestionsCollection.findOne({ status: 'spotlight'}) };
  });


  return <div className="u-absolute u-top-0 w-screen h-screen">
      { 
        <div className="streaming__container">
          <CSSTransition in={!!spotlighted} timeout={1400} classNames="streaming__transition">
            <aside className="streaming__logo"></aside>
          </CSSTransition>
        <SwitchTransition>
        {/* <TransitionGroup className="streaming__question_container"> */}
        <CSSTransition in={!!spotlighted} timeout={700} classNames="streaming__transition"
          key={ spotlighted ? spotlighted._id : 0 }>
            { spotlighted ?
          
            <div className="streaming__question" id={ spotlighted._id }>
              { spotlighted.text }
          </div> : <div></div>
          }
        </CSSTransition>
        {/* </TransitionGroup> */}
        </SwitchTransition>
        </div>
        // </SwitchTransition>
      }
      </div>;

};
