import React, {useState} from 'react'
import styled from 'styled-components'

const Rules = ({rules, setRules, players, owner}) => {
    
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
                <div>
                    <input className="duration" name="duration" type="number" onKeyDown={e => e.preventDefault()} min="10" max="60" step="5" value={rules.duration} disabled={!owner} onChange={handleRules}></input>
                    <label> minutes</label>
                </div>
            </li>
            <li>
                <span># of Imposters</span>
                <div className="tw-toggle">
                    <TwButton active={1} cur_value={rules.numOfImposter} name="numOfImposter" onClick={handleRules} value={1} disabled={!owner} >1</TwButton>
                    <TwButton active={2} cur_value={rules.numOfImposter} name="numOfImposter" onClick={handleRules} value={2} disabled={players.length < 3 || !owner}>2</TwButton>
                    <TwButton active={3} cur_value={rules.numOfImposter} name="numOfImposter" onClick={handleRules} value={3} disabled={players.length < 4 || !owner}>3</TwButton>
                </div>
            </li>
            <li>
                <span># of Guesses</span>
                <div>
                    <input disabled={!owner} className="guesses" name="guesses" type="number" onKeyDown={e => e.preventDefault()} min={rules.numOfCrewmatesTasks} max="20" step="1" value={rules.guesses < rules.numOfCrewmatesTasks ? rules.numOfCrewmatesTasks : rules.guesses} onChange={handleRules}></input>
                    <label> guesses</label>
                </div>
            </li>
            <li>
                <span># of Tasks Required to Win</span>
                <div>
                    <input disabled={!owner} className="numOfCrewmatesTasks" name="numOfCrewmatesTasks" type="number" onKeyDown={e => e.preventDefault()} min="1" max={players.length} step="1" value={rules.numOfCrewmatesTasks} onChange={handleRules}></input>
                    <label> tasks</label>
                </div>
            </li>
            <li>
                <span>Clues</span>
                <div className="tw-toggle">
                    <TwButton disabled={!owner} active={true} cur_value={rules.clues} name="clues" onClick={() => setRules({...rules, clues: true})}>Yes</TwButton>
                    <TwButton disabled={!owner} active={false} cur_value={rules.clues} name="clues" onClick={() => setRules({...rules, clues: false})}>No</TwButton>
                </div>
            </li>
            <hr/>
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
    width: 65%;
    // height: 70%;
    // border: 3px solid black;
    border-radius: 10px;
    background-color: #ffd892;
    // margin: auto;
    padding: 20px;
    .tw-toggle{
        align-items: center;
        display: flex;
        width: 40%;
        justify-content: space-around;
    }
    & li {
        border-radius: 10px;
        background-color: #fff6e6;
        list-style: none;
        margin-bottom: 10px;
        font-size: 20px;
        display: flex;
        justify-content: space-between;
        padding: 12px;
    }
    & hr {
        width: 100%;
        height:2px;
        border-width:0;
        // color:black;
        background-color:white;
    }
`

export default Rules
