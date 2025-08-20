import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTodos, setTotalCount, setCurrentPage, addTodo } from '../../redux/todos/slice';
import { RootState } from '../../redux/store';
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


export const HomePage = () => {
    const { userId } = useAuth();
    const dispatch = useDispatch();
    const { todos, totalCount, currentPage, pageSize } = useSelector((state: RootState) => state.todos);
    const [form] = Form.useForm();
    const { fetchTodos, isLoading } = useFetchTodo();
    const { createTodo, isLoading: isCreating } = useCreateTodo();

    const loadTodos = useCallback(async () => {
        if (userId) {
            const result = await fetchTodos({ userId, page: currentPage, pageSize });
            if (result) {
                dispatch(setTodos(result.todos));
                dispatch(setTotalCount(result.totalCount));
            }
        }
    }, [userId, currentPage, pageSize, fetchTodos, dispatch]);

    useEffect(() => {
        loadTodos();
    }, [loadTodos]);

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        if (userId) {
            try {
                const newTodo = await createTodo({ text: values.text, userId });
                if (newTodo) {
                    dispatch(addTodo(newTodo));
                    form.resetFields();
                    
                    // Проверяем текущую страницу и количество элементов
                    if (currentPage !== 1) {
                        // Если пользователь не на первой странице, перенаправляем на первую
                        dispatch(setCurrentPage(1));
                        // loadTodos будет вызван автоматически через useEffect
                    } else if (todos.length >= pageSize) {
                        // Если на первой странице и достигнут лимит, перезагружаем данные
                        loadTodos();
                    }
                }
            } catch (error) {
                console.error('Ошибка при создании задачи:', error);
            }
        }
    };

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
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

                <Button 
                    type="primary" 
                    htmlType="submit" 
                    style={{ marginLeft: '15px' }}
                >
                    {isCreating ? <LoadingOutlined /> : 'Добавить'}
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
