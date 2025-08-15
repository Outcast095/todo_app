import React from 'react';
import { Button, Checkbox, Flex } from 'antd';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import s from './todo.module.scss';
import { useAuth } from "@clerk/clerk-react";
import { useSupabaseClient } from '../../hooks/useSupabaseAuth';
import { useDeleteTodo } from '../../hooks/useDeleteTodo';

interface TodoProps {
    id: string;
    text: string;
    status: boolean;
}

export const Todo: React.FC<TodoProps> = ({ id, text, status}) => {
    const { userId } = useAuth();
    const supabase = useSupabaseClient();
    const { deleteTodo, isLoading } = useDeleteTodo();

    const handleDelete = async () => {
        if (userId) {
            await deleteTodo({ id, userId });
        }
    };

    const onChange = async (e: any) => {
        
    };

    return (
        <Flex className={s.todo}>
            <Checkbox onChange={onChange} checked={status}>
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
