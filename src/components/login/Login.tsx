import React from 'react';
import s from './login.module.scss'
import {SignIn} from '@clerk/clerk-react'

export const Login = () => {
    return (
        <div className={s.loginWrapper}>
            <SignIn/>
        </div>

    );
};
