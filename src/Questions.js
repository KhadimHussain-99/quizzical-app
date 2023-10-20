import React from "react"
import he from "he"
import { nanoid } from "nanoid"
import './style.css';

export default function Questions(props) {
    const { data, visibility } = props
    const [quiz, setQuiz] = React.useState([])
    const [quizSubmit, setQuizSubmit] = React.useState(false)
    const [count, setCount] = React.useState(0)

    // Function to shuffle an array using the Fisher-Yates algorithm
    function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
    }

    function handleAns(questionId, ansId) {
    const updatedQuiz = quiz.map((item) => {
        if (item.question === questionId) {
        item.answers = item.answers.map((ans) => {
            if (ansId === ans.id) {
            return { ...ans, isSelected: true, isFalse: true }
            } else {
            return { ...ans, isSelected: false, isFalse: false }
            }
        })
        }
        return item
    })
    setQuiz(updatedQuiz)
    }

    React.useEffect(() => {
    const questions = data.map((item) => {
        
        const correct_answer = { 
            id: nanoid(), answer: he.decode(item.correct_answer), isSelected: false, isCorrect: true, isFalse: false
            }
            
        const incorrect_answers = item.incorrect_answers.map(ans => {
            return{ 
            id: nanoid(), answer: he.decode(ans), isSelected: false, isCorrect: false, isFalse: false
            }
        })

        const answers = [...incorrect_answers, correct_answer]

        const shuffledAnswers = shuffleArray(answers)

        const decodedquestion = he.decode(item.question)

        return { question: decodedquestion, answers: shuffledAnswers }
        
    })

    setQuiz(questions)
    }, [data])

    function checkAns() {
    let newCount = 0
    const updatedQuiz = quiz.map((item) => {
                            item.answers.forEach((ans) => {
                            if (ans.isSelected) {
                                if (ans.isCorrect) {
                                newCount++
                                }
                            }
                            })
                            return item
                        });

    setCount(newCount)
    setQuiz(updatedQuiz)
    setQuizSubmit(true)
    }

    const style1 = { backgroundColor: '#B7C1EF', borderColor: '#B7C1EF' }
    const style2 = { backgroundColor: '#78DB8D', borderColor: '#78DB8D' }
    const style3 = { backgroundColor: '#F58888', borderColor: '#F58888' }

    const renderQuiz = quiz.map((item) => {
        const question = item.question
        const answers = item.answers

        return (
            <div key={question}>
            <h2>{question}</h2>
            <div className="ans-container">
                {answers.map((ans) => (
                <div
                    style={ !quizSubmit && ans.isSelected ? style1 : quizSubmit && ans.isSelected && ans.isCorrect ? style2 : quizSubmit && ans.isFalse ? style3 : null }
                    key={ans.id}
                    className="answer"
                    onClick={quizSubmit ? null : () => handleAns(question, ans.id)}
                >
                    {ans.answer}
                </div>
                ))}
            </div>
            <hr />
            </div>
        )
    })

    return (
        <div>
            {!visibility && (
            <div>
                <div>{renderQuiz}</div>
                {quizSubmit && <h3>You scored {count}/10 correct answers</h3>}
                <button className="button" onClick={quizSubmit ? () => window.location.reload() : checkAns}>
                {quizSubmit ? "Retry" : "Check Answers"}
                </button>
            </div>
            )}
        </div>
    )
}
