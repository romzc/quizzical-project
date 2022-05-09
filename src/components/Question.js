import { nanoid } from "nanoid"

export default function Question({question, options, name, form, handleChange, score, correct_answer}) {

    const decodeHtml = (text) => {
        const txt = document.createElement("textarea")
        txt.innerHTML = text
        return txt.value
    }

    const optionsList = options.map(opt => {
        const labelId = nanoid(4)
        const style = score.check && correct_answer === opt ? "correct-answer" : ""

        return  <div key={nanoid()} className="container-input">
                    <input
                        className="container-input__input-radio" 
                        type="radio"
                        id={labelId}
                        name={name}
                        value={opt}
                        checked={form[name] === opt}
                        onChange={(event) => handleChange(event)}
                    />
                    <label
                        className={`container-input__label-radio pointer-event ${style}`}
                        htmlFor={labelId}
                    >
                        {decodeHtml(opt)}
                    </label>
                </div>

    })

    return(
        <div>
            <h3 className="question-title" >{decodeHtml(question)}</h3>
            <div className="container-options">
            {optionsList}
            </div>
        </div>
    )
}