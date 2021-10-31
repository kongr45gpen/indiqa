import React, { useEffect } from 'react';
import { useState } from 'react';

export const PresenterQuestion = ({ question }) => {
    return (
        <div class="frame my-4 w-100 presenter__question">
            <div className={`frame__body p-0 ${question.status == "spotlight" ? "bg-yellow-200 presenter__spotlight" : ""}`}>
                <div className="u-pull-right m-5">
                    <div className="text-purple-700">
                        <span class="icon subtitle mr-1">
                            <i className={`fa-wrapper fa-heart far`}></i>
                        </span>
                        { question.votes }
                    </div>
                    <div class="u-text-right presenter__actions">
                        { question.status == "approved" &&
                        <div>
                            <i className={`fa-wrapper fa-lightbulb fa-fw far`}></i>
                        </div>
}

                        <div>
                            <i className={`fa-wrapper fa-check fa-fw fas`}></i>
                        </div>

                        { question.status == "spotlight" &&
                        <div>
                            <i className={`fa-wrapper fa-caret-down fa-fw fas`}></i>
                        </div>
}
                    </div>
                </div>
                <div class="p-5 question__text">
                    { question.text }
                </div>
            </div>
        </div>
    )
}