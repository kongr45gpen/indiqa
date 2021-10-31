import React, { useEffect } from "react"
import { useState } from "react"

export const Question = ({ question }) => {
  const [voted, setVoted] = useState(false)

  const localStorageId = "question-" + question._id + "-"

  useEffect(() => {
    const localVoted = localStorage.getItem(localStorageId + "voted")
    if (localVoted) {
      setVoted(true)
    }
  }, [])

  const handleVote = (e) => {
    e.preventDefault()

    if (!voted) {
      Meteor.call("questions.vote", question._id, (err, res) => {
        if (!err) {
          setVoted(true)
          localStorage.setItem(localStorageId + "voted", true)
        }
      })
    }
  }

  return (
    <div class="frame my-4">
      <div
        className={`frame__body p-0 ${
          question.status == "answered" ? "text-gray-700" : ""
        }`}
      >
        <div class="u-pull-right m-3 question__vote" onClick={handleVote}>
          <span class="icon subtitle">
            <i
              className={`fa-wrapper fa-heart ${
                voted ? "fas text-danger" : "far"
              }`}
            ></i>
          </span>
          {question.votes}
        </div>
        <div class="p-3 question__text">{question.text}</div>
        {question.response && (
          <div class="frame__footer bg-green-100">
            <div class="frame__subtitle mb-0">
              {question.status == "answered" && (
                <span class="tag tag--success mr-1">
                  <i class="fa-wrapper fa-check fas mr-1"></i>
                  Answered
                </span>
              )}
              <span class="text-green-800">{question.response}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
