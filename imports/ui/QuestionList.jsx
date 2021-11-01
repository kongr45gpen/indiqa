import React from "react"
import { useTracker } from "meteor/react-meteor-data"
import { QuestionsCollection } from "../db/QuestionsCollection.js"
import { Question } from "./Question.jsx"
import { QuestionForm } from "./QuestionForm"

export const QuestionList = () => {
  const onlyApprovedFilter = {
    status: { $in: ["approved", "answered", "spotlight"] },
  }

  const questions = useTracker(() => {
    const handler = Meteor.subscribe("questions.public");

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
      <div className="content mt-4">
        <h3>Ask your questions here!</h3>
        <QuestionForm />
        <h3>Vote on other questions</h3>
        <section>
          {questions.map((question) => (
            <Question key={question._id} question={question} />
          ))}
        </section>
      </div>
    </section>
  )
}
