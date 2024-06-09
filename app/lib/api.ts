import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3005', // замените на ваш URL сервера
});

export interface Todo {
  id: number;
  title: string;
  description: string,
  isCompleted: boolean;
}

export const getTodos = async (): Promise<Todo[]> => {
    try{
        const response = await api.get('/todos');
        return response.data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
};

export const createTodo = async (title: string): Promise<Todo> => {
  const response = await api.post('/todos', { title });
  return response.data;
};

export const updateTodo = async (id: number, data: Todo): Promise<Todo> => {
  const response = await api.patch(`/todos/${id}`, data);
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}`);
};
