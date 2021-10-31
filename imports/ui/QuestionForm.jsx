import React, { useState } from 'react';

export const QuestionForm = () => {
  const [text, setText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    Meteor.call('questions.insert', text);

    setText("");
  };

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type to ask a question"
        value={text}
        onChange={(e) => setText(e.target.value)} //TODO: Throttle
      />

      <button type="submit">Submit</button>
    </form>
  );
};
