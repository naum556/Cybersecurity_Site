import "./PasswordChecker.css"
import { useState } from "react";
import { FaExclamationCircle, FaCheckCircle } from "react-icons/fa";
import shield from "../src/assets/cyber-security-1915626_1280.png"

function PasswordChecker(){

    const [password, setPassword] = useState("")
    const [strength, setStrength] = useState(0)

    const [upperCase, setUpperCase] = useState(false)
    const [lowerCase, setLowerCase] = useState(false)
    const [number, setNumber] = useState(false)
    const [specialChar, setSpecialChar] = useState(false)
    const [length, setLength] = useState(false)

    function checkStrength(value){
        let count = 0
        
        if(/[A-Z]/.test(value)){
            count++;
            setUpperCase(true)
        }else{
            setUpperCase(false)
        }
        if(/[a-z]/.test(value)){
            count++;
            setLowerCase(true)
        }else{
            setLowerCase(false)
        }
        if(value.length >=8 ){
            count++;
            setLength(true)
        }else{
            setLength(false)
        }
        if(/[0-9]/.test(value)){
            count++;
            setNumber(true)
        }else{
            setNumber(false)
        }
        if(/[!@#$%^&*()_+=~`]/.test(value)) {
            count++;
            setSpecialChar(true)
        }else{
            setSpecialChar(false)
        }
        
        setStrength(count)
    }

    function handleChange(e){
        const value = e.target.value
        setPassword(value)
        checkStrength(value)
    }

    return (
        <div className="container-form">
            <h1>Password Power Checker</h1>
            
            <div className="sub-container">
                <div className="input-form">
                    <p><b>Try creating a password:</b></p>
                    <input value={password} onChange={handleChange} type="password"></input>

                    <span>
                        <p><b>Strength:</b></p>
                        <p><b>Type a password! 🔒</b></p>
                    </span>
                    <div className="strength-bar">
                        <div 
                        className="strength-fill"
                        style={{ width: `${strength * 20}%` }}>
                        </div>
                    </div>

                    <p><b>Your password should have:</b></p>

                    <ul>
                        <li className={length ? "valid" : ""}>
                            {length ? <FaCheckCircle /> : <FaExclamationCircle />}
                            At least 8 characters
                        </li>

                        <li className={upperCase ? "valid" : ""}>
                            {upperCase ? <FaCheckCircle /> : <FaExclamationCircle />}
                            Uppercase letter (A-Z)
                        </li>

                        <li className={lowerCase ? "valid" : ""}>
                            {lowerCase ? <FaCheckCircle /> : <FaExclamationCircle />}
                            Lowercase letter (a-z)
                        </li>

                        <li className={number ? "valid" : ""}>
                            {number ? <FaCheckCircle /> : <FaExclamationCircle />}
                            Number (0-9)
                        </li>

                        <li className={specialChar ? "valid" : ""}>
                            {specialChar ? <FaCheckCircle /> : <FaExclamationCircle />}
                            Special character (!@#$%...)
                        </li>
                    </ul>

                </div>

                <div className="img-container">
                    <img src=""></img>
                </div>
            </div> 
        </div>
    );
}

export default PasswordChecker