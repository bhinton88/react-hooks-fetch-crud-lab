import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const[questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(response => response.json())
    .then(data => setQuestions(data))
  }, [])

  function handleNewQuestion(formData) {
    setQuestions([...questions, formData])
  }

  function onClickDelete (deletedQuestion) {
    console.log(deletedQuestion)
    const updatedQuestions = questions.filter(value => value.id !== deletedQuestion.id)
    setQuestions(updatedQuestions)
  }

  function onCategoryChange(updatedQuestion) {
    const updatedQuestions = questions.map(value => {
      if(value.id === updatedQuestion.id){
        return updatedQuestion
      } else {
        return value
      }
    })
    setQuestions(updatedQuestions) // remmeber we must always pass an updated array to our state
    // setter function in order for it to update state 
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(value => 
        <QuestionItem 
          onCategoryChange={onCategoryChange}
          handleNewQuestion={handleNewQuestion}
          onClickDelete={onClickDelete}
          question={value} 
          key={value.id} />  
          )}
      </ul>
    </section>
  );
}

export default QuestionList;
