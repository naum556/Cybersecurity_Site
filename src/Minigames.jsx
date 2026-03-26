import "./Minigames.css"
import { Link } from "react-router-dom"

function Minigames(){
    return(
        <div className="card-container">
            <h1>Cybersecurity Games</h1>

            <Link to="/game1">
                <div className="card game1">
                    <div className="icon">
                        <span className="material-symbols-outlined">
                            cards_star
                        </span>
                    </div>
                    <h3>Matching Game</h3>
                    <p>Paragraph</p>
                </div>
            </Link>

            <Link to="/game2">
                <div className="card game2">
                    <div className="icon">
                        <span class="material-symbols-outlined">
                            phishing
                        </span>
                    </div>
                    <h3>Spot The Phishing</h3>
                    <p>Paragraph</p>
                </div>
            </Link>

            <Link to="/game3">
                <div className="card game3">
                    <div className="icon">
                        <span class="material-symbols-outlined">
                            computer
                        </span>
                    </div>
                    <h3>Safe Links</h3>
                    <p>Paragraph</p>
                </div>
            </Link>

            <Link to="/game4">
                <div className="card game4">
                    <div className="icon">
                        <span class="material-symbols-outlined">
                            bug_report
                        </span>
                    </div>
                    <h3>Avoid The Viruses</h3>
                    <p>Paragraph</p>
                </div>
            </Link>

            <Link to="/game5">
                <div className="card game5">
                    <div className="icon">
                        <span class="material-symbols-outlined">
                            network_node
                        </span>
                    </div>
                    <h3>Node Connector</h3>
                    <p>Paragraph</p>
                </div>
            </Link>

            <Link to="/game6">
                <div className="card game6">
                    <div className="icon">
                        <span class="material-symbols-outlined">
                            lock
                        </span>
                    </div>
                    <h3>Brute Force</h3>
                    <p>Paragraph</p>
                </div>
            </Link>

        </div>
    )
}

export default Minigames