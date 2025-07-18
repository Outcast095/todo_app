import React, {useEffect, useState} from 'react';
import {Button, Flex, Form, Input, Spin,} from "antd";
import type { FormProps } from 'antd';
import s from './home.module.scss'
import {Todo} from "../../features/todos/Todo";
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';

import { fetchMockTodos } from "../../redux/todos/asyncActions";
import {selectTodo} from "../../redux/todos/selectors";
import {LoadingOutlined} from "@ant-design/icons";

type FieldType = {
    values?: string;
};

export const Home = () => {
    const dispatch = useAppDispatch();
    const { todos, loading, error } = useSelector(selectTodo);


    const [form] = Form.useForm();



    useEffect(()=> {
        dispatch(fetchMockTodos())
    }, [])


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values.values);
        form.resetFields(); // ✅ Очистка всех полей
    };

    if (loading) {
        return <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    }

    return (
        <div className={s.home}>

            <div className={s.inputWrapper}>
                <Form
                    className={s.form}
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="text"
                        className={s.input}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your text',
                            },
                        ]}
                    >
                        <Input placeholder="новый todo"/>
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <Flex gap="middle" align="center" vertical>
            {todos.map(item => (
                <Todo
                    key={item.id}
                    text={item.text}
                    status={item.status}
                    onClick={(value) => console.log(item.id, value)}
                />
            ))}
                </Flex>
        </div>
    );
};

