import React from 'react';
import s from './signUp.module.scss'
import {SignUp} from '@clerk/clerk-react'

export const SignUpComponent = () => {
    return (
        <div className={s.signUpWrapper}>
            <SignUp/>
        </div>
    );
};
