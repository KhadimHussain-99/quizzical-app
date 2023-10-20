import React from "react"
import {data} from "./data"
import './style.css';

export default function Start(props){
    const [category, setCategory] = React.useState('')
    const [difficulty, setDifficulty] = React.useState('')
    const [isContainerVisible, setIsContainerVisible] = React.useState(true)
    
    const displayCategories = data.map(category=>{
        return <option value={category.id} key={category.id}>{category.name}</option>
    })
    
    function handleClick(){
        props.startQuiz(category, difficulty)
    }
    
    return(
        <div>
        { props.visibility ? 
        <div className="container">
            <h1>Quizzical</h1>
            <select 
                className="select" 
                id="category"
                onChange={(e)=>setCategory(e.target.value)}
                >
                    <option value="">Category</option>
                    {displayCategories}
            </select>
            <select 
                className="select" 
                id="difficulty" 
                onChange={(e)=> setDifficulty(e.target.value)}
                >
                    <option value="">Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
            </select>
            <button className="button" onClick={handleClick}>Start</button>
        </div>
        : ''}
        </div>
    )
}