import React from 'react';
import classes from './Input.module.css';

const Input = ({type, onChangeHandeler, classNames, value, placeholder, inputStyle, name}) => {
    type = type || "text";
    let inputStyleDefault = classes.inputStyle;
    if (inputStyle) {
        inputStyleDefault = classes[inputStyle];
    }
    classNames = [inputStyleDefault, classNames].join(" ");
    const [inputValue, setInputValue] = React.useState("");
    if (typeof onChangeHandeler !== "function") {
        onChangeHandeler = (event) => {
            setInputValue(event.target.value);
        }
        value = inputValue;
    }
    return <input 
        type={type} 
        onChange = {onChangeHandeler}
        className={classNames}
        value={value}
        placeholder={placeholder}
        name={name}
    />
}

export default Input;