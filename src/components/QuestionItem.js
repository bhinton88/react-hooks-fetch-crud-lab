import React from "react";

function QuestionItem({ question, onClickDelete, onCategoryChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete () {
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method: "DELETE",
    })
    .then(response => response.json())
    .then(() => onClickDelete(question))
  }

  // REMEMBER THAT DELETE DOES NOT RETURN DATA, NO NEED TO .THEN THE RESPONSE DATA  

  // when deleting an item, you only need an anonymous function with no argument passed, 
  // while passing the deleted question to our onclickdelete... which will set the state
  // for our questions and filter out the questions with an ID that do not match the deleted
  // question

  function handleCategoryChange(event) {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "correctIndex" : event.target.value
      })
    })
    .then(response => response.json())
    .then(data => onCategoryChange(data))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select 
        onChange={handleCategoryChange}
        defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
