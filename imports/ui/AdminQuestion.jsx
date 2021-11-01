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
      <div className="content">
        {question.votes > 0 && (
          <div class="u-pull-right">
            <span class="icon subtitle">
              <i className={`far fa-wrapper fa-heart`}></i>
            </span>
            {question.votes}
          </div>
        )}
        <p>{question.text}</p>
      </div>
      <div class="card__action-bar u-center">
          { Object.keys(questionMachine.states[question.status].on).map(event => {
              const state = questionMachine.states[question.status].on[event];

            return (<button key={ event } className={`btn-${state.color} btn-small`} onClick={handleTransition.bind(this, event)}>{ event }</button>);
          })}
      </div>
      {(question.status != "new") &&
      (
        <div class="card__footer">
          <div class="u-text-center">
            <form data-id={ question.id } onSubmit={handleResponse}>
              <textarea
                rows="1"
                className="input-xsmall m-0 w-80 question__response_area"
                value={ text }
                onChange={(e) => setText(e.target.value)} //TODO: Throttle
              />
              <button
                type="submit"
                className="btn-info outline btn-small w-80 p-0"
              >
                Set response
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
