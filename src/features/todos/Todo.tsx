import React from 'react';
import { Button, Checkbox, Flex } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../redux/store';
import { deleteTodo } from '../../redux/todos/deleteTodos';
import { updateTodoStatus } from '../../redux/todos/updateTodoStatus';
import { fetchTodos } from '../../redux/todos/fetchTodos';
import s from './todo.module.scss';
import { useAuth } from "@clerk/clerk-react";
import { useSupabaseClient } from '../../hooks/useSupabaseAuth';

interface TodoProps {
    id: string;
    text: string;
    status: boolean;
}

export const Todo: React.FC<TodoProps> = ({ id, text, status }) => {
    const { userId } = useAuth();
    const dispatch = useAppDispatch();
    const supabase = useSupabaseClient();

    const handleDelete = async () => {
        if (userId && supabase) {
            await dispatch(deleteTodo({ id, userId }));
            dispatch(fetchTodos({ userId, page: 1, pageSize: 5 }));
        }
    };

    const onChange = async (e: any) => {
        if (userId && supabase) {
            await dispatch(updateTodoStatus({ id, status: e.target.checked, userId }));
            dispatch(fetchTodos({ userId, page: 1, pageSize: 5 }));
        }
    };

    return (
        <Flex className={s.todo}>
            <Checkbox onChange={onChange} checked={status}>
                <span className={status ? s.completed : ''}>{text}</span>
            </Checkbox>
            <Button
                className={s.deleteButton}
                type="primary"
                icon={<DeleteOutlined style={{ fontSize: '16px', color: '#fff' }} />}
                onClick={handleDelete}
            />
        </Flex>
    );
};
