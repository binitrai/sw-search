import React from 'react';

import classes from './Button.module.css';

const button = ({clicked, children, btnType, type, name, disabled, style, classNames}) => {
    type = type || "button";
    classNames = classNames || ""
    return (
        <button
            className={[classes.Button, classes[btnType], classNames].join(' ')}
            onClick={clicked}
            type={type}
            style={style}
            name = {name}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
    

export default button;