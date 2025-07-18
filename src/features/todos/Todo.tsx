import React, {FC, useState} from 'react';
import s from './todo.module.scss'
import { Button, Flex } from 'antd';

import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';

interface TodoProps {
    text: string;
    status: boolean
    onClick?: (value: boolean) => void;
}

export const Todo: FC<TodoProps> = ({text, status, onClick}) => {


    const onChange: CheckboxProps['onChange'] = (e) => {
        onClick?.(e.target.checked);
    };


    return (
        <div className={s.todo}>
            <Flex justify={"space-between"} align={'center'}>

                <Checkbox onChange={onChange} checked={status}></Checkbox>

                <p>{text}</p>
                <Button type="primary" loading={false} iconPosition={'start'}>
                    удалить
                </Button>
            </Flex>
        </div>
    );
};
