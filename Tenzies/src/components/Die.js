export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    let dice
    if (props.value === 1) {
        dice = <div className="dice first-face">
                        <span className="dot"></span>
                     </div>
    } else if (props.value === 2) {
        dice = <div className="dice second-face">
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
    } else if (props.value === 3) {
        dice = <div className="dice third-face">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>
    } else if (props.value === 4) {
        dice = <div className="dice fourth-face">
                        <div className="column">
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                        
                        <div className="column">
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    </div>
    } else if (props.value === 5) {
        dice = <div className="dice fifth-face">
                        <div className="column">
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>

                        <div className="column">
                            <span className="dot"></span>
                        </div>
                        
                        <div className="column">
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    </div>
    } else if (props.value === 6) {
        dice = <div className="dice fourth-face">
                        <div className="column">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                        
                        <div className="column">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    </div>
    }
    return (
        <div 
            style={styles}
            onClick={props.holdDice}
            className="die"
        >
            {dice}
            
        </div>
    )
}