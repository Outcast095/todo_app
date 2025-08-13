import React from 'react';
import {SignUpComponent} from "../../components/signUp/SignUpComponent";
import {Flex} from "antd";

export const SignUpPage = () => {
    return (
        <Flex  justify={"center"} align={"center"}>
            <SignUpComponent/>
        </Flex>
    );
};
