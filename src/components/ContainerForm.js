import { nanoid } from 'nanoid';
import React from 'react'
import Form from './Form'

export default function ContainerForm () {

    const API = "https://opentdb.com/api.php?amount=6&category=18";

    const [question, setQuestion] = React.useState([])
    const [play, setPlay] = React.useState(false)
    const [form, setForm] = React.useState({})
    const [score, setScore] = React.useState({})

    React.useEffect(() => {
        fetch(API)
            .then(response => response.json())
            .then(response => {
                const resp = response.results
                const restMap = resp.map(element => (
                    {
                        ...element,
                        name: nanoid(4), // reduce name's length
                        id: nanoid(),
                        options: getRandom(element.incorrect_answers, element.correct_answer)
                    }
                ))
                setQuestion(restMap)
                return restMap
            })
            .then(rest => setForm(getFormObject(rest)))
            .then(setScore({check: false, points: 0}))

    },[play])

    const getFormObject = (list) => {
        const formObject = {}
        list.forEach(element => (formObject[element.name] = ""))
        return formObject
    }

    const getRandom = (list, item) => {
        list = [...list, item]
        let random
        let aux
        for(let i = 0; i < list.length; ++i) {
            random = Math.floor(Math.random()*list.length);
            aux = list[i]
            list[i] = list[random]
            list[random] = aux 
        }
        return list
    }

    const playHandler = () => {
        setPlay(prev =>! prev)
        setQuestion([])
    }

    const handleChange = (event) => {
        const {name, value} = event.target 
        setForm(prevState => (
            {
                ...prevState,
                [name]: value,
            }
        ))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let counter = 0
        for(let element of question ) {
            if(form[element.name] === element.correct_answer) {
                counter++
            }
        }
        setScore({check: true, points: counter})
    }

    const style = score.check ? "document-check" : "";

    return (
        <div className={style}>
            {   question.length ? 
                <>
                <Form 
                    questions={question} 
                    formObject={form} 
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    score={score}
                />
                {
                    score.check &&
                    <div className='container-score'>
                        <p className='container-score__points'>You scored {score.points}/{question.length} correct answers</p>
                        <button 
                            onClick={playHandler} 
                            className='container-score__button-play'
                        >
                                Play again
                        </button>
                    </div>
                }
                </>
                :
                <p>Loading</p>
            }
        </div>
    )
}