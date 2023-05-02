import React, { useState, Fragment, useEffect } from "react"
import { questionMachine } from "../state/questionState";
import { toast } from 'react-toastify';


export const AdminQuestion = ({ question }) => {
  const [text, setText] = useState(question.response);

  let bg = '';

  if (question.status == "new") {
    bg = 'bg-indigo-100'
  } else if (question.status == "answered") {
    bg = 'bg-green-100';
  } else if (question.status == "spotlight") {
    bg = 'bg-yellow-200';
  } else if (question.status == "rejected") {
    bg = 'bg-red-300'
  }

  const handleResponse = e => {
    e.preventDefault();

    Meteor.call('questions.setResponse', question._id, text, (err, res) => {
      if (err) {
        toast.error("Error submitting response: " + err);
      } else {
        toast.success("Response set");
      }
    });
  };

  const handleTransition = transition => {
    const nextStatus = questionMachine.states[question.status].on[transition].target;

    Meteor.call('questions.setStatus', question._id, nextStatus, (err, res) => {
      if (err) {
        toast.error("Error setting status: " + err);
      }
    });
  }

  return (
    <div className={`card ${bg}`}>
      <div className="content m-2">
        <p>{question.text}</p>
      </div>
      <div className="card__action-bar mx-2">
        <div className="admin__question_votes">
          <span className="icon subtitle">
            <i className={`far fa-wrapper fa-heart`}></i>
          </span>
          {question.votes}
        </div>
        {Object.keys(questionMachine.states[question.status].on).map(event => {
          const state = questionMachine.states[question.status].on[event];

          return (<button key={event} className={`btn-${state.color} btn--xs`} onClick={handleTransition.bind(this, event)}>{event}</button>);
        })}
        <p className="admin__question_time">{question.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      {(question.status != "new" && question.status != "rejected") &&
        (
              <form data-id={question.id} onSubmit={handleResponse} className="mx-4 mb-1 u-flex u-items-stretch u-gap-1">
                <textarea
                  rows="1"
                  className="input-xsmall m-0 p-1 text-sm u-flex-grow-1 question__response_area"
                  value={text}
                  placeholder="Response..."
                  onChange={(e) => setText(e.target.value)} //TODO: Throttle
                />
                <button
                  type="submit"
                  className="btn-info outline btn--sm p-0 m-0"
                >
                  <i className={`fas fa-paper-plane`}></i>
                </button>
              </form>
        )}
    </div>
  )
}
