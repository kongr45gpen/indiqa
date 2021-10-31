import React, { useState, Fragment, useEffect } from "react"

export const AdminQuestion = ({ question }) => {
  return (
    <div class="card">
      <div class="content">
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
        <button class="btn-link outline">Buttons</button>
        <button class="btn-link outline">Go here</button>
      </div>
      {(question.status != "new") &&
      (
        <div class="card__footer">
          <div class="u-text-center">
            <form>
              <textarea
                rows="1"
                className="input-xsmall m-0 w-80 question__response_area"
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
