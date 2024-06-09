'use client'
import React, { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo, Todo } from './lib/api';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import ImageUpload from './components/ImageUpload';

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  const handleAddTodo = async (title: string) => {
    const newTodo =await createTodo(title);
    setTodos([...todos, newTodo]);
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    // Найти текущую задачу по id
    const currentTodo = todos.find(todo => todo.id === id);

    if (currentTodo) {
      // Создать обновленный объект задачи с измененным isCompleted
      const updatedTodo = {
        ...currentTodo,
        isCompleted: !currentTodo.isCompleted,
      };
      console.log(updatedTodo)
      // Отправить обновленный объект на сервер
      const updatedServerTodo = await updateTodo(id, updatedTodo);
      // Обновить состояние с измененной задачей
      setTodos(todos.map((todo) => (todo.id === id ? updatedServerTodo : todo)));
    }
  };

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 bg-gray-900 text-white shadow-md rounded">
      {/* <h1 className="text-2xl font-bold mb-4">Загрузить изображение</h1>
      <ImageUpload /> */}
      <h1 className="text-2xl font-bold mb-4">Сделай пост</h1>
      <AddTodo onTodoAdded={fetchTodos} />
      <TodoList todos={todos} onToggleComplete={handleToggleComplete} onDelete={handleDeleteTodo} />
    </div>
  );
};

export default Home;
