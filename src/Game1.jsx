import { useState, useEffect } from "react"

function Game1(){

    const [round, setRound] = useState(1)
    const [cards, setCards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [matched, setMatched] = useState([])

    function shuffle(array){
        return [...array].sort(() => Math.random() - 0.5)
    }

    function generateCards(roundNumber){
        let pairs = roundNumber + 1

        let values = []
        for(let i = 0; i < pairs; i++){
            values.push(i)
            values.push(i)
        }

        let shuffled = shuffle(values).map((value, index) => ({
            id: index,
            value: value
        }))

        setCards(shuffled)
        setFlipped([])
        setMatched([])
    }

    useEffect(() => {
        generateCards(round)
    }, [round])

    function handleClick(card){

        if(flipped.length === 2) return
        if(flipped.includes(card.id)) return
        if(matched.includes(card.value)) return

        const newFlipped = [...flipped, card.id]
        setFlipped(newFlipped)

        if(newFlipped.length === 2){

            const first = cards.find(c => c.id === newFlipped[0])
            const second = cards.find(c => c.id === newFlipped[1])

            if(first.value === second.value){
                setMatched(prev => [...prev, first.value])
                setFlipped([])

                if(matched.length + 1 === round + 1){
                    setTimeout(() => {
                        if(round < 10){
                            setRound(prev => prev + 1)
                        }else{
                            alert("You finished all 10 rounds!")
                        }
                    }, 500)
                }

            }else{
                setTimeout(() => {
                    setFlipped([])
                }, 800)
            }
        }
    }

    return(
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #1e3c72, #2a5298)",
            padding: "10px"
        }}>

            <div style={{
                background: "white",
                padding: "20px",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                textAlign: "center",
                width: "90%",
                maxWidth: "600px"
            }}>

                <h2 style={{marginBottom:"20px"}}>
                    Round {round}/10
                </h2>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(70px, 1fr))",
                    gap: "12px",
                    width: "100%",
                    margin: "0 auto"
                }}>

                    {cards.map(card => {

                        const isFlipped =
                            flipped.includes(card.id) ||
                            matched.includes(card.value)

                        return(
                            <div
                                key={card.id}
                                onClick={() => handleClick(card)}
                                style={{
                                    width:"100%",
                                    aspectRatio:"1 / 1",
                                    background: isFlipped ? "#4CAF50" : "#444",
                                    color:"white",
                                    display:"flex",
                                    alignItems:"center",
                                    justifyContent:"center",
                                    fontSize:"clamp(16px, 3vw, 24px)",
                                    cursor:"pointer",
                                    borderRadius:"12px",
                                    boxShadow:"0 4px 10px rgba(0,0,0,0.2)",
                                    transition:"all 0.2s ease",
                                    transform: isFlipped ? "scale(1.05)" : "scale(1)"
                                }}
                                onMouseEnter={(e) => {
                                    if(!isFlipped){
                                        e.currentTarget.style.transform = "scale(1.08)"
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = isFlipped ? "scale(1.05)" : "scale(1)"
                                }}
                            >
                                {isFlipped ? card.value : "?"}
                            </div>
                        )
                    })}

                </div>

            </div>

        </div>
    )
}

export default Game1