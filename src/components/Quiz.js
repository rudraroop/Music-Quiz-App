import React from "react";
import {useState, useEffect} from "react";

export default function Quiz(){

    const [quizData, setQuizData] = useState([])
    const [submitted, setSubmit] = useState(false)
    const [newGame, setNewGame] = useState(0)

    useEffect(() => {
    
        fetch("https://opentdb.com/api.php?amount=5&category=12&difficulty=medium&type=multiple")
            .then(res => res.json())
            .then(res => {setQuizData(res.results.map( (elem, index) => {
                return {
                    ...elem,
                    question: fixText(elem.question),
                    id: index,
                    somethingSelected: false,
                    selected: -1,
                    answers: randomize([...elem.incorrect_answers, elem.correct_answer].map( (el, ind, curAr) => {
                        return {
                            text: fixText(el),
                            id: ind,
                            isSelected: false,
                            isCorrect: ( ind == curAr.length - 1 )
                        }
                    } ))
                }
            } ))});

        setSubmit(false)
        console.log("effect ran")

    }, [newGame])

    function startNew(){
        setNewGame(cur => cur+1)
    }

    function toggleSelect(questionId, optionId){
        //Only one thing can be selected at a time 
        setQuizData(qData => qData.map(question => {
            return question.id != questionId ? question 
            : {...question, somethingSelected: !question.somethingSelected, selected: optionId,
                answers: question.answers.map(ans => {
                return ans.id == optionId ? {...ans, isSelected: !ans.isSelected}: {...ans, isSelected: false}
            })}
        })
        )
    }

    function randomize(array){
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    function renderOptions(quizElement){
        return quizElement.answers.map(elem => (
            <button className = {`options ${elem.isSelected && "selected"}`} onClick={() => {toggleSelect(quizElement.id, elem.id)}}>
                {elem.text}
            </button>
        ))
    }

    function renderAnswers(quizElement){
        return quizElement.answers.map(elem => (
            <button className = {`options ${elem.isCorrect && "correct"} ${elem.isSelected && (elem.isCorrect ? "correct" : "loss" )}`}>
                {elem.text}
            </button>
        ))
    }

    function fixText(str){
        return str.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&");
    }

    const renderQuestions = quizData.map(
        quizElement => (
                <div>
                <h3>{quizElement.question}</h3>
                <h2>{submitted ? renderAnswers(quizElement) : renderOptions(quizElement)}</h2>
                <hr></hr>
                </div>
            )
    )

    return (
        <div className="Quiz">
            <h1>Your Quiz</h1>
            <div className="quiz-elements">
                {renderQuestions}
            </div>

            {submitted? <button className="submitButton" onClick={startNew}>New Game</button> : <button className="submitButton" onClick={()=>setSubmit(true)}>Check Answers</button>} 
        </div>
    )

}