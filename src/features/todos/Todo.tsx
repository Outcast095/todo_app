import React, {FC} from 'react';
import s from './todo.module.scss'
import { Button, Flex } from 'antd';
import { useAppDispatch } from '../../redux/store';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import { useAuth } from "@clerk/clerk-react";
import { updateTodoStatus } from '../../redux/todos/updateTodoStatus';
import { fetchTodos } from '../../redux/todos/fetchTodos';
import { deleteTodo } from '../../redux/todos/deleteTodos';
import { useSelector } from 'react-redux';
import { selectTodo } from '../../redux/todos/selectors';

interface TodoProps {
    text: string;
    status: boolean;
    id: string | undefined;
}

export const Todo: FC<TodoProps> = ({text, status, id}) => {
    const dispatch = useAppDispatch();
    const { userId } = useAuth();
    const { currentPage, pageSize } = useSelector(selectTodo);

    const onChange: CheckboxProps['onChange'] = async (e) => {
        if (id && userId) {
            await dispatch(updateTodoStatus({ id, status: e.target.checked, userId }));
            dispatch(fetchTodos({ userId, page: currentPage, pageSize }));
        }
    };

    const handleDelete = async () => {
        if (id && userId) {
            await dispatch(deleteTodo({ id, userId }));
            dispatch(fetchTodos({ userId, page: currentPage, pageSize })); // Обновляем список после удаления
        }
    };

    return (
        <div className={s.todo}>
            <Flex justify={"space-between"} align={'center'}>
                <Checkbox onChange={onChange} checked={status}></Checkbox>
                <p className={s.text}>{text}</p>
                <Button onClick={handleDelete} type="primary">
                    Удалить
                </Button>
            </Flex>
        </div>
    );
};
