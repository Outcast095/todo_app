import React, { useEffect, useState } from 'react';
import { Button, Flex, Form, Input, Spin } from 'antd';
import type { FormProps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useFetchTodo } from '../../hooks/useFetchTodo';
import { useCreateTodo } from '../../hooks/useCreateTodo';
import { Todo } from '../../features/todos/Todo';
import { PaginationComponent } from '../../components/paginationComponent/PaginationComponent';
import s from './home.module.scss';
import { useAuth } from "@clerk/clerk-react";

type FieldType = {
    text: string;
};

interface Todo {
    id: string;
    status: boolean;
    text: string;
}

export const HomePage = () => {
    const { userId } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [form] = Form.useForm();
    const { fetchTodos, isLoading } = useFetchTodo();
    const { createTodo, isLoading: isCreating } = useCreateTodo();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [totalCount, setTotalCount] = useState(0);



    useEffect(() => {
        const loadTodos = async () => {
            if (userId) {
                const result = await fetchTodos({ userId, page: currentPage, pageSize });
                if (result) {
                    setTodos(result.todos);
                    setTotalCount(result.totalCount);
                }
            }
        };
        loadTodos();
    }, [userId, currentPage, pageSize, fetchTodos]);

    const onFinish: FormProps<FieldType>["onFinish"] = async (value) => {
        if (userId) {
            const newTodo = await createTodo({ text: value.text, userId });
            if (newTodo) {
                if (currentPage !== 1) {
                    setCurrentPage(1);
                } else {
                    const result = await fetchTodos({ userId, page: 1, pageSize });
                    if (result) {
                        setTodos(result.todos);
                        setTotalCount(result.totalCount);
                    }
                }
            }
        }
        form.resetFields();
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };



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
                    {isLoading ? (
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                    ) : (
                        todos.map((item) => (
                            <Todo 
                                key={item.id} 
                                id={item.id} 
                                text={item.text} 
                                status={item.status}
                            />
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
                    loading={isLoading}
                />
            </div>
        </div>
    );
};
