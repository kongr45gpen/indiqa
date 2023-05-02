import { Meteor } from "meteor/meteor"
import React, { useState, Fragment, useEffect } from "react"
import { toast } from "react-toastify"
import { useTracker } from "meteor/react-meteor-data"
import { SessionsCollection } from "../db/SessionsCollection"
import { SessionAdminSession } from "./SessionAdminSession"

export const SessionAdmin = () => {
  Meteor.subscribe("sessions.admin")
  Meteor.subscribe("questions.admin")

  const handleNewSession = e => {
    e.preventDefault();

    Meteor.call('sessions.create', {
      name: e.target.name.value,
      active: false
    }, (err, res) => {
      if (err) {
        toast.error("Error creating session: " + err);
      } else {
        toast.success("Session added");
      }
    });
  };

  const {
    sessions,
  } = useTracker(() => {
    const sessions = SessionsCollection.find({}, {
      sort: [['name', 'asc']]
    }).fetch()

    return {
      sessions
    }
  });
  const user = useTracker(() => Meteor.user())

  return user ? (
    <Fragment>
      <section>
        <div className="tag-container u-center">
          <div className="tag">Session administrator</div>
          <div className="tag">Logged in as</div>
          <div className="tag">{user.username}</div>
        </div>

        <h3>List of sessions</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Session Name</th>
              <th>Active</th>
              <th>Count</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              sessions.map((s) => <SessionAdminSession key={s._id} session={s} /> )
            }
          </tbody>
        </table>

        <h3>Add new session</h3>
        <form onSubmit={handleNewSession}>
          <div class="form-group">
            <input type="text" class="form-group-input" placeholder="Name" name="name" //TODO: Throttle 
            />
            <button class="form-group-btn btn-primary">Add</button>
          </div>
        </form>
      </section>
    </Fragment>
  ) : (
    <div>You do not have access to this resource</div>
  )
}
