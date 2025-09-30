import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { TodoData, TodoStatus } from "@/app/_types/TodoTypes";




type TodoItemProps = {
  todo: TodoData;
  onStatusChange?: (todoId: number, newStatus: TodoStatus) => void;
  onEditBeginingHandler?: (todo: TodoData) => void;
};


const STATUS_OPTIONS = [
  { value: TodoStatus.Backlog, label: "未着手" },
  { value: TodoStatus.Inprogress, label: "対応中" },
  { value: TodoStatus.Done, label: "完了" },
];

const TodoItem = ({
  todo,
  onStatusChange,
  onEditBeginingHandler,
  isEditing = false,
}: TodoItemProps): JSX.Element => {

  let itemDesign = {
    caption: "",
    textColor: "",
    bgColor: "",
  };

  switch (todo.status) {
    case TodoStatus.Backlog:
      itemDesign.caption = "未着手";
      itemDesign.textColor = "text-gray-500";
      itemDesign.bgColor = "bg-gray-500";
      break;
    case TodoStatus.Inprogress:
      itemDesign.caption = "対応中";
      itemDesign.textColor = "text-blue-500";
      itemDesign.bgColor = "bg-blue-500";
      break;
    case TodoStatus.Done:
      itemDesign.caption = "完了"
      itemDesign.textColor = "text-emerald-500";
      itemDesign.bgColor = "bg-emerald-500";
      break;
  }
  
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as TodoStatus;

    const newStatusValue = e.target.value;

  const matchedOption = STATUS_OPTIONS.find(opt => opt.value === newStatusValue);

  if (!matchedOption) {
    alert("不正な状態です。");
    return;
  }

    
    if (newStatus !== todo.status) {
      if (window.confirm(`状態を「${itemDesign.caption}」から「${STATUS_OPTIONS.find(opt => opt.value === newStatus)?.label}」に変更してよろしいですか？`)) {
        onStatusChange?.(todo.id, newStatus);
      }
    }
  };

  return (
    <div className="flex w-full border border-gray-300 max-w-sm overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className={`flex items-center justify-center w-12 ${itemDesign.bgColor}`}>
        {todo.status === TodoStatus.Done && (
          <FaCheckCircle className="w-6 h-6 text-white fill-current" />
        )}
      </div>

      <div className="px-4 py-2 -mx-3 flex-grow">
        <div className="mx-3">
          <span className={`font-semibold ${itemDesign.textColor}`}>
            {todo.title}
          </span>
          <p className="me-1 mb-0 text-gray-700">{itemDesign.caption}</p>
          <p className="text-sm text-gray-600 dark:text-gray-200">{todo.description}</p>

         
          <select
            value={todo.status}
            onChange={handleStatusChange}
            className="mt-2 rounded-md border border-gray-300 px-2 py-1 text-sm"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            className="mt-2 ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:outline-none"
            onClick={() => onEditBeginingHandler?.(todo)}
          >
            編集
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
