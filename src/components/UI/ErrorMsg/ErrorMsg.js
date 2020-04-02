import React from 'react';
import classes from './ErrorMsg.module.css';
import i18 from '../../../services/i18.services';

const errorMsg = ({isError, msg = i18.somethingWentWrong}) => {
    if (!isError) {
        return null;
    }
    return (
        <div className={classes.ErrorMsg}>
            {msg}
        </div>
    )
}
export default errorMsg