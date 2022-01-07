import React, {useState} from 'react'
import styled from 'styled-components'

const Rules = () => {
    const [rules, setRules] = useState({
        duration: 5,
        numOfImposter: 1
    })
    console.log(rules)

    const handleRules = e => {
        setRules({
            ...rules,
            [e.target.name]: parseInt(e.target.value)
        })
    }
    // const placeHolder = new Array(5).fill({
    //     name: "Bob"
    // })

    return (
        <RuleContainer>
            <li>
                <span>Game Duration</span>
                <label>{rules.duration} minutes</label>
                <input className="duration" name="duration" type="range" min="5" max="30" step="1" value={rules.duration} onChange={handleRules}></input>
            </li>
            <li>
                <span>Number of Imposters</span>
                <div className="tw-toggle">
                    <button name="numOfImposter" onClick={handleRules} value={1}>1</button>
                    <button name="numOfImposter" onClick={handleRules} value={2}>2</button>
                    <button name="numOfImposter" onClick={handleRules} value={3}>3</button>
                </div>
            </li>
        </RuleContainer>
    )
}

const RuleContainer = styled.ul`
    display: flex;
    flex-direction: column;
    width: 60%;
    // height: 70%;
    border: 5px solid black;
    // margin: auto;
    padding: 10px;
    .tw-toggle{
        align-items: center;
        display: flex;
        width: 40%;
        justify-content: space-around;
    }
    & li {
        list-style: none;
        border: 1px solid black;
        margin-bottom: 10px;
        font-size: 20px;
        display: flex;
        justify-content: space-between;
        padding: 12px;
    }
`

export default Rules
