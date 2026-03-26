import "./Header.css";
import { FaShieldAlt } from "react-icons/fa";

function Header(){
    return(
        <div className="container">
            <div className="header1">
                <h1><i class="fa fa-shield"></i> Cyber Kids</h1>
                <h3>Become a Super Online Safety Hero!</h3>
                <p>Learn how to stay safe, be smart, and have fun while exploring the amazing world of the internet!</p>
            </div>
        </div>

    );
}

export default Header