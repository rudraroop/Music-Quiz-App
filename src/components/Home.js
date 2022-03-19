import React from "react"

export default function Home(props){

    return (
        <div className="home">
            <h1>Quizhody</h1>
            <p>Test your music Knowledge</p>
            <button className="submitButton" onClick={props.startNewQuiz}>Start Quiz</button>
        </div>
    )

}