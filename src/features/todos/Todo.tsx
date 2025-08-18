import React from 'react';
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
    onUpdate: (todo: { id: string; text: string; status: boolean }) => void;
}

export const Todo: React.FC<TodoProps> = ({ id, text, status, onUpdate }) => {
    const { userId } = useAuth();
    const { deleteTodo, isLoading } = useDeleteTodo();
    const { updateTodoStatus, isLoading: isUpdating } = useUpdateTodoStatus();

    const handleDelete = async () => {
        if (userId) {
            const deletedId = await deleteTodo({ id, userId });
            if (deletedId && onUpdate) {
                onUpdate({ id, text, status });
            }
        }
    };

    const onChange = async (e: any) => {
        if (userId) {
            const updatedTodo = await updateTodoStatus({ id, status: e.target.checked, userId });
            if (updatedTodo && onUpdate) {
                onUpdate(updatedTodo);
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
