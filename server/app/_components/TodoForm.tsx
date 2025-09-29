'use client';

import React from "react";
import TodoItem from "@/app/_components/TodoItem";
import { TodoData, TodoStatus } from "@/app/_types/TodoTypes";
import TodoEditor from "@/app/_components/TodoEditor";

const TodoForm = ({ children }: { children: TodoData[] }): JSX.Element => {

  const [todoList, setTodoList] = React.useState<TodoData[]>(children);

  const maxId = todoList.length > 0 ? Math.max(...todoList.map(todo => todo.id)) : -1;
  const newTodo: TodoData = {
    id: maxId + 1,
    status: TodoStatus.Done,
    title: "Newタスク",
    description: "タスクの説明文",
  };

  const [editingTodoIndex, setEditingTodoIndex] = React.useState<number | undefined>(undefined);
  const [editTargetTodo, setEditTargetTodo] = React.useState<TodoData>(newTodo);

  const onTodoSubmitted = (todo: TodoData) => {
    if (editingTodoIndex === undefined) {
      setTodoList([...todoList, todo]);
    } else {
      setTodoList([
        ...todoList.slice(0, editingTodoIndex),
        todo,
        ...todoList.slice(editingTodoIndex + 1),
      ]);
    }
    setEditingTodoIndex(undefined);
    setEditTargetTodo(newTodo);
  };

  const onTodoEditBegining = (todo: TodoData) => {
    const idx = todoList.findIndex((item) => item.id === todo.id);
    setEditingTodoIndex(idx);
    setEditTargetTodo(todoList[idx]);
  };

  return (
    <>
      {todoList.map((item, index) => (
        <TodoItem
          key={item.id}
          todo={item}
          onEditBeginingHandler={onTodoEditBegining}
          isEditing={index === editingTodoIndex} 
        />
      ))}
      <TodoEditor editTargetTodo={editTargetTodo} onSubmit={onTodoSubmitted} />
    </>
  );
};

export default TodoForm;
