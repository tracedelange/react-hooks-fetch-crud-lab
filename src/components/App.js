import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {

  
  
  const [questions, setQuestions] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)
  
  
  const [page, setPage] = useState("List");

  useEffect(()=> {


    fetch('http://localhost:3000/questions')
    .then((response) => response.json())
    .then(data => {
      
    setQuestions(data)
    setDataLoaded(true)
    
    })


  }, [])

  const addNewQuestion = (question) => {

    let newQuestionArray = [...questions, question]

    setQuestions(newQuestionArray)

  }

  const deleteQuestion = (id) => {


    let questionToRemove = questions.find((question) => question.id === id)
    let questionToRemoveIndex = questions.indexOf(questionToRemove)


    let newQuestionList = [...questions]
    newQuestionList.splice(questionToRemoveIndex, 1)

    setQuestions(newQuestionList)


    // fetch('http://localhost:3000/questions/' + id, {method: "DELETE"})

  }


  const adjustCorrect = (event, id) => {

    let newCorrectIndex = event.target.value

    let questionToAdjust = questions.find((question) => question.id === id)
    let questionToAdjustIndex = questions.indexOf(questionToAdjust)

  
    let adjustedQuestion = {
      ...questionToAdjust,
      correctIndex: newCorrectIndex
    }

    let newQuestionArray = [...questions]
    newQuestionArray.splice(questionToAdjustIndex, 1, adjustedQuestion)

    setQuestions(newQuestionArray)

    //Update JSON server:

    fetch('http://localhost:3000/questions/' + id, {

    method: "PATCH",
      
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
    
      'correctIndex' : newCorrectIndex
    })


    })



    

  }
 

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm handleQuestionSubmission={addNewQuestion} /> : (dataLoaded ? <QuestionList handleCorrectChange={adjustCorrect} handleDeleteClick={deleteQuestion} questions={questions}/> : <p>Loading...</p>)}
    </main>
  );
}

export default App;
