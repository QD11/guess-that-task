import React, {useState} from 'react'
import styled from 'styled-components'

const Rules = () => {
    const [rules, setRules] = useState({
        duration: 5,
        numOfImposter: 1,
        clues: true,
    })
    console.log(rules)

    const handleRules = e => {
        setRules({
            ...rules,
            [e.target.name]: parseInt(e.target.value)
        })
    }

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
                    <TwButton active={1} cur_value={rules.numOfImposter} name="numOfImposter" onClick={handleRules} value={1}>1</TwButton>
                    <TwButton active={2} cur_value={rules.numOfImposter} name="numOfImposter" onClick={handleRules} value={2}>2</TwButton>
                    <TwButton active={3} cur_value={rules.numOfImposter} name="numOfImposter" onClick={handleRules} value={3}>3</TwButton>
                </div>
            </li>
            <li>
                <span>Clues</span>
                <div className="tw-toggle">
                    <TwButton active={true} cur_value={rules.clues} name="clues" onClick={() => setRules({...rules, clues: true})}>Yes</TwButton>
                    <TwButton active={false} cur_value={rules.clues} name="clues" onClick={() => setRules({...rules, clues: false})}>No</TwButton>
                </div>
            </li>
        </RuleContainer>
    )
}

const TwButton = styled.button`
    // background-color: brown;
    color: ${props => props.active === props.cur_value ? "white": "black"};
    background-color: ${props => props.active === props.cur_value ? "black": "#fff"};
`

const RuleContainer = styled.ul`
    display: flex;
    flex-direction: column;
    width: 60%;
    // height: 70%;
    border: 3px solid black;
    border-radius: 10px;
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
