import React, { useState } from 'react';

import { toast } from 'react-toastify';

export const QuestionForm = () => {
  const [text, setText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    Meteor.call('questions.insert', text, (err, res) => {
        if (err) {
            toast.error("Error submitting question: " + err);
        } else {
            setText("");
            toast.success("Your question has been sumbitted! A moderator will approve it shortly.");
        }
    });

  };

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      <div className="input-control">
        <textarea
            type="text"
            placeholder="Type here to ask a question..."
            className="input-large font-alt"
            autoFocus="autoFocus"
            value={text}
            onChange={(e) => setText(e.target.value)} //TODO: Throttle
        />
      </div>

      <button className="btn-info btn-large btn-animated w-100" type="submit">Ask Question</button>
    </form>
  );
};
