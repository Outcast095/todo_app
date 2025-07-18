import React, {useState} from 'react';
import {Button, Flex, Form, Input,} from "antd";
import type { FormProps } from 'antd';
import s from './home.module.scss'
import {Todo} from "../../features/todos/Todo";

type FieldType = {
    values?: string;
};

export const Home = () => {

    const [form] = Form.useForm();
    const [todoList, setTodoList] = useState([
        { id: 1, status: false, text: 'купить бананы' },
        { id: 2, status: false, text: 'купить мандарины' },
        { id: 3, status: false, text: 'купить виноград' },
        { id: 4, status: false, text: 'купить абрикосы' },
        { id: 5, status: false, text: 'купить яблоки' }
    ]);

    const handleStatusChange = (id: number, newStatus: boolean) => {
        setTodoList(prev =>
            prev.map(item =>
                item.id === id ? { ...item, status: newStatus } : item
            )
        );
    };

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        form.resetFields(); // ✅ Очистка всех полей
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <div className={s.todos}>

            <div>
                <Form
                    className={s.inputWrapper}
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item name="Input" className={s.input}>
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
            {todoList.map(item => (
                <Todo
                    key={item.id}
                    text={item.text}
                    status={item.status}
                    onClick={(value) => handleStatusChange(item.id, value)}
                />
            ))}
                </Flex>
        </div>
    );
};

