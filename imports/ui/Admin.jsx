import { Meteor } from "meteor/meteor"
import React, { useState, Fragment, useEffect } from "react"
import { toast } from "react-toastify"
import { useTracker } from "meteor/react-meteor-data"
import { AdminQuestion } from "./AdminQuestion"
import { QuestionsCollection } from "../db/QuestionsCollection"

export const Admin = () => {
  let readyt = false;
  const handler = Meteor.subscribe("questions.admin", () => { this.readyt = true })

  const {
    newQuestions,
    approvedQuestions,
    answeredQuestions,
    rejectedQuestions,
  } = useTracker(() => {
    const newQuestions = QuestionsCollection.find(
      { status: { $in: ["new"] } },
      {
        sort: [["createdAt", "asc"]],
      }
    ).fetch()

    const approvedQuestions = QuestionsCollection.find(
      { status: { $in: ["approved", "spotlight"] } },
      {
        sort: [
          ["votes", "desc"],
          ["createdAt", "asc"],
        ],
      }
    ).fetch()

    const answeredQuestions = QuestionsCollection.find(
      { status: { $in: ["answered"] } },
      {
        sort: [["answeredAt", "asc"]],
      }
    ).fetch()

    const rejectedQuestions = QuestionsCollection.find(
      { status: { $in: ["rejected"] } },
      {
        sort: [["createdAt", "asc"]],
      }
    ).fetch()

    return {
      newQuestions,
      approvedQuestions,
      answeredQuestions,
      rejectedQuestions,
    }
  })
  const user = useTracker(() => Meteor.user())

  useEffect(() => {
    if (Notification.permission !== "granted" && Notification.permission !== "denied") {
      Notification.requestPermission();
    }

    const observer = QuestionsCollection.find(
      { status: { $in: ["new"] } },
    ).observeChanges({
      added(id, question) {
        if (handler.ready()) {
          if (Notification.permission === "granted") {
            new Notification("New IndiQA question!", {
              body: question.text,
            })
          }
        }
      }
    })

    return function cleanup() {
      observer.stop();
    }
  }, [])

  return user ? (
    <Fragment>
      <section>
        <p class="lead">Logged in as {user.username}</p>
        <div class="row">
          <div class="col-4">
            <h3 className="u-text-center">
              <i class="far fa-wrapper fa-plus-square"></i> New
            </h3>
            {newQuestions.map((question) => (
              <AdminQuestion key={question._id} question={question} />
            ))}
          </div>
          <div class="col-4">
            <h3 className="u-text-center">
              <i class="fas fa-wrapper fa-check"></i> Approved
            </h3>
            {approvedQuestions.map((question) => (
              <AdminQuestion key={question._id} question={question} />
            ))}
          </div>
          <div class="col-4">
            <h3 className="u-text-center">
              <i class="fas fa-wrapper fa-volume-up"></i> Answered
            </h3>
            {answeredQuestions.map((question) => (
              <AdminQuestion key={question._id} question={question} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="">
            <i class="fas fa-wrapper fa-crossmark"></i> Rejected
          </h3>
          <div class="row">
            {rejectedQuestions.map((question) => (
              <div key={question._id} className="col-4">
                <AdminQuestion question={question} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  ) : (
    <div>You do not have access to this resource</div>
  )
}
