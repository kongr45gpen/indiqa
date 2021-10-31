import React, { useState } from 'react';

export const QuestionForm = () => {
  const [text, setText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    Meteor.call('questions.insert', text, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            setText("");
        }
    });

  };

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      <div class="input-control">
        <textarea
            type="text"
            placeholder="Type here to ask a question..."
            class="input-large"
            autoFocus="autoFocus"
            value={text}
            onChange={(e) => setText(e.target.value)} //TODO: Throttle
        />
      </div>

      <button class="btn-info btn-large btn-animated w-100" type="submit">Ask Question</button>
    </form>
  );
};
