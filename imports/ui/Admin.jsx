import { Meteor } from "meteor/meteor"
import React, { useState, Fragment, useEffect } from "react"
import { toast } from "react-toastify"
import { useTracker } from "meteor/react-meteor-data"
import { AdminQuestion } from "./AdminQuestion"
import { QuestionsCollection } from "../db/QuestionsCollection"
import { SessionsCollection } from "../db/SessionsCollection"

export const Admin = () => {
  const handler = Meteor.subscribe("questions.admin");
  Meteor.subscribe("sessions.admin");

  const {
    newQuestions,
    approvedQuestions,
    answeredQuestions,
    rejectedQuestions,
    currentSession,
  } = useTracker(() => {
    const activeSessions = SessionsCollection.find({ active: true }).fetch()
      .map(s => s._id);

    const sessionFilter = {
      $or: [{ session: null }, { session: { $in: activeSessions } }],
    }

    const newQuestions = QuestionsCollection.find(
      { status: { $in: ["new"] }, ...sessionFilter },
      {
        sort: [["createdAt", "asc"]],
      }
    ).fetch()

    const approvedQuestions = QuestionsCollection.find(
      { status: { $in: ["approved", "spotlight"] }, ...sessionFilter },
      {
        sort: [
          ["votes", "desc"],
          ["createdAt", "asc"],
        ],
      }
    ).fetch()

    const answeredQuestions = QuestionsCollection.find(
      { status: { $in: ["answered"] }, ...sessionFilter },
      {
        sort: [["answeredAt", "asc"]],
      }
    ).fetch()

    const rejectedQuestions = QuestionsCollection.find(
      { status: { $in: ["rejected"] }, ...sessionFilter },
      {
        sort: [["createdAt", "asc"]],
      }
    ).fetch()

    const currentSession = SessionsCollection.getActiveSession();

    return {
      newQuestions,
      approvedQuestions,
      answeredQuestions,
      rejectedQuestions,
      currentSession
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
        <div className="tag-container u-center">
          <div className="tag">Logged in as</div>
          <div className="tag">{user.username}</div>
          {currentSession && <Fragment>
            <div className="tag">Current session:</div>
            <div className="tag tag--black">{currentSession.name}</div>
          </Fragment>}
        </div>

        <div className="row">
          <div className="col-4">
            <h3 className="u-text-center">
              <i className="far fa-wrapper fa-plus-square"></i> New
            </h3>
            {newQuestions.map((question) => (
              <AdminQuestion key={question._id} question={question} />
            ))}
          </div>
          <div className="col-4">
            <h3 className="u-text-center">
              <i className="fas fa-wrapper fa-check"></i> Approved
            </h3>
            {approvedQuestions.map((question) => (
              <AdminQuestion key={question._id} question={question} />
            ))}
          </div>
          <div className="col-4">
            <h3 className="u-text-center">
              <i className="fas fa-wrapper fa-volume-up"></i> Answered
            </h3>
            {answeredQuestions.map((question) => (
              <AdminQuestion key={question._id} question={question} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="">
            <i className="fas fa-wrapper fa-crossmark"></i> Rejected
          </h3>
          <div className="row">
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
