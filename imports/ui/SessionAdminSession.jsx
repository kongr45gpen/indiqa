import { Meteor } from "meteor/meteor"
import React, { useState, Fragment, useEffect } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { toast } from "react-toastify"
import { QuestionsCollection } from "../db/QuestionsCollection"
import { SessionsCollection } from "../db/SessionsCollection"
import { useTracker } from "meteor/react-meteor-data"


export const SessionAdminSession = ({ session }) => {
    const [editing, setEditing] = useState(false);

    const handleText = e => {
        e.preventDefault();

        Meteor.call('sessions.update', {
            _id: session._id,
            name: e.target.name.value,
          }, (err, res) => {
            if (err) {
              toast.error("Error updating session: " + err);
            } else {
              toast.success("Session updated");
            }
          });

          setEditing(false);
    }

    const handleActive = e => {
        e.preventDefault();

        Meteor.call('sessions.update', {
            _id: session._id,
            active: !(session.active),
          }, (err, res) => {
            if (err) {
              toast.error("Error updating session: " + err);
            } else {
              toast.success("Session updated");
            }
          });
    }

    const handleDelete = e => {
        e.preventDefault();

        if (!window.confirm(`Really delete session ${session.name}?`)) {
            return;
        }

        Meteor.call('sessions.delete', {
            _id: session._id,
          }, (err, res) => {
            if (err) {
              toast.error("Error deleting session: " + err);
            } else {
              toast.success("Session deleted");
            }
          });
    }

    const { questionCount } = useTracker(() => {
        return {
            questionCount: QuestionsCollection.find({ session: session._id }).count()
        };
    });

    return <tr>
        {editing ?
            <td>
                <form className="form-group" onSubmit={ handleText }>
                    <input type="text" className="form-group-input input--sm" name="name" defaultValue={session.name} />
                    <button onClick={() => setEditing(false)} className="form-group-btn btn--xs">Cancel</button>
                    <button type="submit" className="form-group-btn btn-primary btn--xs">Save</button>
                </form>
            </td>
            :
            <td onClick={() => setEditing(true)}>{session.name}</td>
        }
        <td className="vertical-middle"><div className="form-ext-control pl-0">
            <label className="form-ext-toggle__label">
                <div className="form-ext-toggle mx-auto">
                    <input name="toggleCheckbox" type="checkbox" className="form-ext-input" checked={session.active} onClick={handleActive} onChange={() => {}} />
                    <div className="form-ext-toggle__toggler"><i></i></div>
                </div>
            </label>
        </div></td>
        <td className="vertical-middle">
            <ErrorBoundary>
                { questionCount }
            </ErrorBoundary>
        </td>
        <td className="vertical-middle">
            <a className="text-danger" href="" onClick={handleDelete}>
                <i className="fas fa-trash-alt"></i>
            </a>
        </td>
    </tr>;
}
