import logo from './logo.svg';
import Home from './components/Home'
import Quiz from './components/Quiz'
import {useState} from 'react'

function App() {

  const [gameStarted, setGameStart] = useState(false)

  function startNewQuiz(){
    setGameStart(true)
  }

  return (
    <div className="App">
      <main>
        {gameStarted ? <Quiz/> :
        <Home key="Home" startNewQuiz={startNewQuiz}/>}
      </main>
    </div>
  );
}

export default App;
