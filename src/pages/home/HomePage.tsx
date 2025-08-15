import React, { useEffect, useState } from 'react';
import { Button, Flex, Form, Input, Spin } from 'antd';
import type { FormProps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';
import { selectTodo } from '../../redux/todos/selectors';
import { createTodo } from '../../redux/todos/createTodos';
import { fetchTodos } from '../../redux/todos/fetchTodos';
import { setCurrentPage } from '../../redux/todos/slice';
import { Todo } from '../../features/todos/Todo';
import { PaginationComponent } from '../../components/paginationComponent/PaginationComponent';
import s from './home.module.scss';
import { useAuth } from "@clerk/clerk-react";

type FieldType = {
    text: string;
};

interface Todo {
    id: string;
    created_at: string;
    status: boolean;
    text: string;
    userId: string;
}

export const HomePage = () => {
    const { userId } = useAuth();
    const dispatch = useAppDispatch();
    const { todos, loading, currentPage, pageSize, totalCount } = useSelector(selectTodo);
    const [form] = Form.useForm();

    const { getToken } = useAuth();

    useEffect(() => {
        if (userId) {
            dispatch(fetchTodos({ userId, page: currentPage, pageSize }));
        }
    }, [userId, dispatch, currentPage, pageSize]);

    const onFinish: FormProps<FieldType>["onFinish"] = async (value) => {
       console.log(value.text)
       console.log(userId)
        if (userId) {
            await dispatch(createTodo({ text: value.text, userId }));
            // После создания новой задачи, возвращаемся на первую страницу
            if (currentPage !== 1) {
                dispatch(setCurrentPage(1));
            } else {
                dispatch(fetchTodos({ userId, page: 1, pageSize }));
            }
        }
        form.resetFields();
    };

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    if (loading) {
        return (
            <div className={s.spinnerWrapper}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
            </div>
        );
    }

    return (
        <div className={s.homePage}>
            <Form
                form={form}
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
                className={s.form}
            >
                <Form.Item<FieldType>
                    name="text"
                    rules={[{ required: true, message: 'Пожалуйста введите задачу!' }]}
                    style={{ flex: 1, marginBottom: 0 }}
                >
                    <Input placeholder="Введите задачу" className={s.input} />
                </Form.Item>

                <Button type="primary" htmlType="submit" style={{ marginLeft: '15px' }}>
                    Добавить
                </Button>
            </Form>

            <div className={s.todosContainer}>
                <Flex vertical gap={16}>
                    {loading ? (
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                    ) : (
                        todos.map((item) => (
                            <Todo key={item.id} id={item.id} text={item.text} status={item.status} />
                        ))
                    )}
                </Flex>
            </div>
            
            <div className={s.paginationWrapper}>
                <PaginationComponent
                    current={currentPage}
                    total={totalCount}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    loading={loading}
                />
            </div>
        </div>
    );
};
