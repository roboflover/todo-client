import React from 'react';
import { Todo } from '../lib/api';

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onDelete }) => {

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li key={todo.id} className="flex items-center justify-between p-2 border rounded bg-gray-800 text-white">
          <div className="flex-grow">
            <span
              className={`block ${todo.isCompleted ? 'line-through' : ''}`}
            >
              {todo.title}
            </span>
            {todo.description && (
              <span
                className={`block text-gray-400 ${todo.isCompleted ? 'line-through' : ''}`}
              >
                {todo.description}
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onToggleComplete(todo.id, !todo.isCompleted)}
              className={`p-2 rounded ${todo.isCompleted ? 'bg-yellow-500' : 'bg-green-500'} text-white`}
            >
              {todo.isCompleted ? 'Uncomplete' : 'Complete'}
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
