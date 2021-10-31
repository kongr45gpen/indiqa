import React, { useState } from 'react';
import { QuestionsCollection } from '../api/QuestionsCollection';

export const QuestionForm = () => {
  const [text, setText] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    QuestionsCollection.insert({
      text: text.trim(),
      createdAt: new Date()
    });

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
