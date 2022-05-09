import React from 'react'
import ContainerForm from './ContainerForm'

export default function Quizz() {

    const[show, setShow] = React.useState(false);

    
    return (
        <div className="quizz-container">
            { !show ?
                <>
                    <h1>Quizzical</h1>
                    <p>This is a quizz aplication</p>
                    <button
                        className='quizz-button' 
                        onClick={() => setShow(prevState => !prevState)}
                    >
                            Start quizz
                    </button>
                </>
            :
                <ContainerForm/>
            }
        </div>
    )
}