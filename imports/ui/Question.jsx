import React, { useEffect, forwardRef } from "react"
import { useState } from "react"

export const Question = forwardRef(({ question }, ref) => {
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
    <div className="frame my-4" ref={ref}>
      <div
        className={`frame__body p-0 ${
          question.status == "answered" ? "text-gray-700" : ""
        }`}
      >
        <div className="p-3 question__text">
          <div className="u-pull-right question__vote" onClick={handleVote}>
          <span className="icon subtitle">
            <i
              className={`fa-wrapper fa-heart ${
                voted ? "fas text-danger" : "far"
              }`}
            ></i>
          </span>
            {question.votes}
          </div>
          {question.text}
          <p className="date__main u-text-right">{question.createdAt.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
        </div>
        {question.response && (
          <div className="frame__footer bg-green-100">
            <div className="frame__subtitle mb-0">
              {question.status == "answered" && (
                <span className="tag tag--success mr-1">
                  <i className="fa-wrapper fa-check fas mr-1"></i>
                  Answered
                </span>
              )}
              <span className="text-green-800">{question.response}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
})
