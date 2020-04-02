import React from 'react';

import classes from './FormRow.module.css';

const formRow = ({children, style}) => {
    return (
        <div
            className={classes.FormRow}
            style={style}
        >
            {children}
        </div>
    )
}
    

export default formRow;