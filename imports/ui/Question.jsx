import React, { useEffect } from 'react';
import { useState } from 'react';

export const Question = ({ question }) => {
    const [voted, setVoted] = useState(false);

    const localStorageId = 'question-' + question._id + '-';

    useEffect(() => {
        const localVoted = localStorage.getItem(localStorageId + 'voted');
        if (localVoted) {
            setVoted(true);
        }
    }, []);

    const handleVote = e => {
        e.preventDefault();

        if (!voted) {
            Meteor.call('questions.vote', question._id);
            setVoted(true);
            localStorage.setItem(localStorageId + 'voted', true);
        }
    };

    return (
        <div class="frame my-4">
            <div class="frame__body">
                <div class="u-pull-right m-2 question__vote" onClick={handleVote}>
                    <span class="icon subtitle">
                        <i class="fa-wrapper fa-heart" className={`fa-wrapper fa-heart ${voted ? "fas text-danger" : "far"}`}></i>
                    </span>
                    { question.votes }
                </div>
                <div class="p-2 font-alt question__text">
                    { question.text }
                </div>
            </div>
        </div>
    )
}