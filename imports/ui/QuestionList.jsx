import React from "react"
import { useTracker } from "meteor/react-meteor-data"
import { QuestionsCollection, questionsWithSession } from "../db/QuestionsCollection.js"
import { Question } from "./Question.jsx"
import { QuestionForm } from "./QuestionForm"
import FlipMove from 'react-flip-move';

export const QuestionList = () => {
  const onlyApprovedFilter = {
    status: { $in: ["approved", "answered", "spotlight"] },
    ...questionsWithSession()
  }

  const questions = useTracker(() => {
    Meteor.subscribe("questions.public");

    return QuestionsCollection.find(onlyApprovedFilter, {
      sort: [
        ["status", "desc"],
        ["votes", "desc"],
        ["createdAt", "asc"],
      ],
    }).fetch()
  })

  return (
    <section>
      <div className="content mt-4 pb-2 px-4">
        <h3>Ask your questions here!</h3>
        <QuestionForm />
        <h3>Vote on other questions</h3>
        <section>
          <FlipMove>
            {questions.map((question) => (
              <Question key={question._id} question={question} />
            ))}
          </FlipMove>
        </section>
      </div>
    </section>
  )
}
