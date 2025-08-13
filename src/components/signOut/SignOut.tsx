import React from 'react';
import {SignOutButton} from "@clerk/clerk-react";

export const SignOut = () => {
    return (
        <SignOutButton redirectUrl="/sign-in">
            <button>Выйти</button>
        </SignOutButton>
    );
};

