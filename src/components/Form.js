import React from 'react'
import { nanoid } from 'nanoid'
import Question from './Question'


export default function Form ({questions, formObject, handleChange, handleSubmit, score}) {
    
    const questionList = questions.map((quest) => {
        return  <Question
                    form={formObject}
                    key={nanoid()}
                    name={quest.name}
                    id={quest.id}
                    question={quest.question}
                    options={quest.options}
                    correct_answer={quest.correct_answer}
                    handleChange={handleChange}
                    score={score}
                />
    })


    
    return (
        <form onSubmit={handleSubmit}>
            {questionList}
            {
                !score.check &&
                <button className='form-button'>Check answers</button>
            }
        </form>
    )
} 