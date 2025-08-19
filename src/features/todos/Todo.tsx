import React from 'react';
import { useDispatch } from 'react-redux';
import { removeTodo, updateTodoStatus as updateTodoStatusAction } from '../../redux/todos/slice';
import { Button, Checkbox, Flex } from 'antd';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';

import s from './todo.module.scss';
import { useAuth } from "@clerk/clerk-react";
import { useDeleteTodo } from '../../hooks/useDeleteTodo';
import { useUpdateTodoStatus } from '../../hooks/useUpdateTodoStatus';

interface TodoProps {
    id: string;
    text: string;
    status: boolean;
}

export const Todo: React.FC<TodoProps> = ({ id, text, status}) => {
    const { userId } = useAuth();
    const { deleteTodo, isLoading } = useDeleteTodo();
    const { updateTodoStatus, isLoading: isUpdating } = useUpdateTodoStatus();

    
    const dispatch = useDispatch();

    const handleDelete = async () => {
        if (userId) {
            try {
                const deletedId = await deleteTodo({ id, userId });
                if (!deletedId) {
                    console.error('Ошибка: Не удалось удалить задачу');
                    return;
                }
                dispatch(removeTodo(id));
            } catch (error) {
                console.error('Ошибка при удалении задачи:', error);
            }
        }
    };

    
    const onChange = async (e: { target: { checked: boolean } }) => {
        if (userId) {
            try {
                const updated = await updateTodoStatus({ id, status: e.target.checked, userId });
                if (updated) {
                    dispatch(updateTodoStatusAction({ id, status: e.target.checked }));
                }
            } catch (error) {
                console.error('Ошибка при обновлении статуса:', error);
            }
        }
    };

    return (
        <Flex className={s.todo}>
            <Checkbox onChange={onChange} checked={status} disabled={isUpdating}>
                <span className={status ? s.completed : ''}>{text}</span>
            </Checkbox>
            <Button
                className={s.deleteButton}
                type="primary"
                icon={isLoading ? <LoadingOutlined /> : <DeleteOutlined style={{ fontSize: '16px', color: '#fff' }} />}
                onClick={handleDelete}
                disabled={isLoading}
            />
        </Flex>
    );
};
