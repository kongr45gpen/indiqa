import React, { useEffect, forwardRef } from 'react';
import { questionMachine } from "../state/questionState";
import { QuestionsCollection } from '../db/QuestionsCollection';

export const PresenterQuestion = forwardRef(({ question }, ref) => {
    const handleTransition = transition => {
        const nextStatus = questionMachine.states[question.status].on[transition].target;

        Meteor.call('questions.setStatus', question._id, nextStatus, (err, res) => {
            if (err) {
                toast.error("Error setting status: " + err);
            }
        });
    }

    return (
        <div ref={ref} className="frame my-4 w-100p presenter__question">
            <div className={`frame__body p-0 ${question.status == "spotlight" ? "bg-yellow-200 presenter__spotlight" : ""}`}>
                <div className="u-pull-right m-5">
                    <div className="text-purple-700">
                        <span className="icon subtitle mr-1">
                            <i className={`fa-wrapper fa-heart far`}></i>
                        </span>
                        {question.votes}
                    </div>
                    <div className="u-text-right presenter__actions text-gray-700">
                        {question.status == "approved" &&
                            <div onClick={handleTransition.bind(this, "SPOTLIGHT")}>
                                <i className={`fa-wrapper fa-lightbulb fa-fw far`}></i>
                            </div>
                        }

                        <div onClick={handleTransition.bind(this, "ANSWER")}>
                            <i className={`fa-wrapper fa-check fa-fw fas`}></i>
                        </div>

                        {question.status == "spotlight" &&
                            <div onClick={handleTransition.bind(this, "CANCEL")}>
                                <i className={`fa-wrapper fa-caret-down fa-fw fas`}></i>
                            </div>
                        }
                    </div>
                </div>
                <div className="p-5 question__text">
                    {question.text}
                </div>
            </div>
        </div>
    )
})