import { RootState } from '../store';

export const selectTodo = (state: RootState) => state.todos;