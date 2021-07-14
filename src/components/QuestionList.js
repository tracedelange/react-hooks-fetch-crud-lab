import React from "react";
import QuestionItem from './QuestionItem'

function QuestionList({questions, handleDeleteClick, handleCorrectChange}) {

  const questionComps = questions.map((question) => <QuestionItem handleCorrectChange={handleCorrectChange} handleDeleteClick={handleDeleteClick} key={question.id} question={question} />)

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionComps}</ul>
    </section>
  );
}

export default QuestionList;
