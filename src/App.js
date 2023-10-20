import React from "react"
import Start from "./Start"
import Questions from "./Questions"
import './style.css';


function App() {
  
  const [data, setData] = React.useState([])
  const [isVisible, setIsVisible] = React.useState(true)
  
  function startQuiz(num, level){
      const category = num
      const difficulty = level
      
      const url = `https://opentdb.com/api.php?amount=10&category=${category}&
      difficulty=${difficulty}&type=multiple`
      
      fetch(url)
          .then(res => res.json())
          .then(data => {
              setData(data.results)
              })
      setIsVisible(!isVisible)
  }
  
  return(
      <div>
          <Start startQuiz={(category, difficulty) => startQuiz(category, difficulty)}           visibility={isVisible} />
          <Questions data={data} visibility={isVisible} />
      </div>
  )
}

export default App;
