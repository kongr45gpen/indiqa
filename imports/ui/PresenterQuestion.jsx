import React, { useEffect } from 'react';
import { useState } from 'react';

export const PresenterQuestion = ({ question }) => {
    return (
        <div class="frame my-4 w-100 presenter__question">
            <div className={`frame__body p-0 ${question.status == "spotlight" ? "bg-yellow-200" : ""}`}>
                <div class="u-pull-right m-3 question__vote text-indigo-700">
                    <span class="icon subtitle mr-1">
                        <i className={`fa-wrapper fa-heart far`}></i>
                    </span>
                    { question.votes }
                </div>
                <div class="p-5 question__text">
                    { question.text }
                </div>
                { question.status == "answered" &&
                    <div class="frame__footer bg-green-100">
                        <div class="frame__subtitle">
                            <span class="tag tag--success mr-1">
                                <i class="fa-wrapper fa-check fas mr-1"></i>
                                Answered</span>
                            <span class="text-green-800">{ question.response }</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}