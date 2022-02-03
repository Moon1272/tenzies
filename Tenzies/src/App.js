import Die from "./components/Die"
import React from "react"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App() {

    const [diceNumber, setDiceNumber] = React.useState(allNewDice)
    const [tenzies, setTenzies] = React.useState(false)
    const [rollCount, setRollCount] = React.useState(0)
    const [bestScore, setBestScore] = React.useState(
        JSON.parse(localStorage.getItem('bestScore')) || ""
    )

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const Dice = []
        for (let i = 0; i < 10; i++) {
            Dice.push(generateNewDie())
        }
        return Dice;
        
    }

    function rollDice() {
        if (!tenzies) {
            setDiceNumber(prevDice => prevDice.map(die => {
                return die.isHeld
                    ? die
                    : generateNewDie()
            }))
            setRollCount(prevRoll => prevRoll + 1)
        } else {
            setTenzies(false)
            setDiceNumber(prevDice => prevDice.map(die => {
                return generateNewDie()
            }))
            setRollCount(0)
        }
        
    }

    function holdDice(id) {
        setDiceNumber(prevDice => prevDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }

    const diceElements = diceNumber.map(dice => 
        <Die 
            key={dice.id}
            value={dice.value}
            isHeld={dice.isHeld} 
            holdDice={() => holdDice(dice.id)}
        />
        )

        React.useEffect(() => {
            const allHeld = diceNumber.every(die => die.isHeld)
            const firstValue = diceNumber[0].value
            const allSameValue = diceNumber.every(die => die.value === firstValue)
            
            if (allHeld && allSameValue) {
                setTenzies(true)
                if (bestScore === "") {
                    setBestScore(rollCount)
                    localStorage.setItem('bestScore', JSON.stringify(rollCount))
                } else if (rollCount < bestScore) {
                    setBestScore(rollCount)
                    localStorage.setItem('bestScore', JSON.stringify(rollCount))
                }
            }
            
        }, [diceNumber])

    return (
        <>
            <main className="main">
            <h1 className="main--title">Tenzies</h1>
                <p className="main--text">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
                
                <div className="container">
                    {diceElements}
                </div>
                <h2 className="roll-count">Roll Count: {rollCount}</h2>
                <h2 className="roll-count">Best Score: {bestScore}</h2>
                <button className="roll" onClick={rollDice}>
                    {tenzies ? "New Game" : "Roll"}
                </button> 
                {tenzies && <Confetti
                            />
                }
                
            </main>
        </>
    )
}