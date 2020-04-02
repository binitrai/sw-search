import React from 'react';
import classes from './Logo.module.css';
import i18 from "../../services/i18.services";

const logo = () => (
    <div className={classes.Logo}>
        {i18.logoText}
    </div>
);

export default logo;