import "./QuestionForm.css"
import { useState } from "react"


function QuestionForm(){

    const questionBank = [
        {
            question: "Should you share your password with friends?",
            options: ["Yes", "No", "Only if they ask"],
            answer: 1
        },
        {
            question: "What makes a password strong?",
            options: ["Your name", "123456", "Letters, numbers and symbols"],
            answer: 2
        },
        {
            question: "Should you click unknown links?",
            options: ["Yes", "No", "Sometimes"],
            answer: 1
        },
        {
            question: "What is phishing?",
            options: ["Fishing game", "Trying to steal your info", "A virus"],
            answer: 1
        },
        {
            question: "What should you do if a stranger messages you online?",
            options: ["Reply", "Ignore and tell an adult", "Send pictures"],
            answer: 1
        }
    ]

    const [questions, setQuestions] = useState(questionBank.slice(0,3))
    const [index, setIndex] = useState(0)
    const [message,setMessage] = useState("")
    const [answer, setAnswer] = useState(false)
    const [selected, setSelected] = useState(null)
    const [score, setScore] = useState(0)
    const [finished, setFinished] = useState(false)

    function handleAnswer(i){

        setSelected(i)

        const isCorrect = i === current.answer

        if(isCorrect){
            setMessage("Correct!")
            setScore(prev => prev + 1)
        } else {
            setMessage("Wrong!")
        }

        setTimeout(() => {
            const nextIndex = index + 1

            if(nextIndex === 3){
                setFinished(true)
            }else{
                setIndex(nextIndex)
            }

            setSelected(null)
            setMessage("")
        }, 800)
    }

    function restartQuiz(){
        generateNewQuestions()
        setIndex(0)
        setScore(0)
        setFinished(false)
        setSelected(null)
        setMessage("")
    }

    function generateNewQuestions(){
        const shuffled = [...questionBank].sort(() => 0.5 - Math.random())
        const newQuestions = shuffled.slice(0,3)

        setQuestions(newQuestions)
    }

    const current = questions[index]

    return(
        <div className="q-container">
            <h1>Test your safety skills</h1>

            <div className="question-form">

                {finished ? (
                    <>
                        <h2>Quiz finished!</h2>
                        <h3>You got {score} out of 3 correct 🎉</h3>
                        <button className="play-again-btn" onClick={restartQuiz}>Play again</button>
                    </>
                ) : (
                    <>
                        <h2 className="progress">
                            Question {index + 1} / 3
                        </h2>
                        
                        <h2>{current.question}</h2>
                        <p>{message}</p>

                        <ul>
                            {current.options.map((option,i)=>(
                                <li key={i}>
                                    <button
                                        className={
                                            selected === i
                                                ? (i === current.answer ? "correct" : "wrong")
                                                : ""
                                        }
                                        onClick={() => handleAnswer(i)}
                                    >
                                        {option}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

            </div>
        </div>
    )
}

export default QuestionForm