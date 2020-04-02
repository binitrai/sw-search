import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Redirect } from "react-router-dom";

import classes from './Login.module.css';
import * as actionCreators from "../../store/actions/actionCreators";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import FormRow from "../../components/UI/FormRow/FormRow";
import Logo from "../../components/Logo/Logo";
import i18 from "../../services/i18.services";

function Login(props) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const submitHandeler = (e) => {
        e.preventDefault();
        props.onAuth(name, password);
    } 
    const {isLoggedIn, authState} = props;
    const isDisabled = (name === "" || password === "" || authState === 1) ? true : false;

    useEffect(() => {
        isLoggedIn();
    }, [isLoggedIn]);

    if (authState === 3) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className={classes.Main}>
            <p className={classes.SignInText}>
                {i18.signInText}
            </p>
            <Logo />
            <form onSubmit={submitHandeler}>
                <FormRow>
                    <Input 
                        value={name}
                        placeholder={i18.signinPlaceholder}
                        onChangeHandeler={(e) => setName(e.target.value)}
                        name="userName"
                    />
                </FormRow>
                <FormRow>
                    <Input 
                        type="password"
                        value={password}
                        placeholder={i18.passwordPlaceholder}
                        onChangeHandeler={(e) => setPassword(e.target.value)}
                        name="password"
                    />
                </FormRow>
                <FormRow>
                    <Button 
                        btnType="Rounded" 
                        type="submit" 
                        name="login" 
                        disabled={isDisabled}
                    >
                        {authState === 1 ? i18.signInProgress :i18.signInText}
                    </Button>
                </FormRow>
            </form>
            {authState === 2 ? 
             <section className={classes.error}> 
                <p>{props.error}</p>
            </section> : null}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        authState : state.authState,
        error : state.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
      onAuth : (login, password) => dispatch(actionCreators.auth(login, password)),
      isLoggedIn : () => dispatch(actionCreators.authCheckState())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
