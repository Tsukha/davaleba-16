import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useTaskContext } from "./TaskContext";

const taskColors = {
  purple: "#8b5cf6",
  indigo: "#6366f1",
  teal: "#14b8a6",
  cyan: "#06b6d4",
  pink: "#ec4899",
  orange: "#f97316",
  default: "#9ca3af",
};

const TaskContainer = styled.div`
  border-left-width: 4px;
  border-left-style: solid;
  border-left-color: ${(props) =>
    taskColors[props.$color] || taskColors.default};
  padding: 0.75rem;
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  margin-bottom: 0.5rem;
  cursor: ${(props) => (props.$isEditing ? "default" : "move")};
`;

const TaskText = styled.p`
  color: #1f2937;
`;

const TaskInput = styled.input`
  width: 100%;
  padding: 0.25rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 1rem;
  color: #1f2937;
  outline: none;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }
`;

export default function Task({ task, columnKey, onDragStart, onDragEnd }) {
  const { updateTaskTitle, toggleEditMode } = useTaskContext();
  const [title, setTitle] = useState(task.title);
  const inputRef = useRef(null);

  useEffect(() => {
    if (task.isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [task.isEditing]);

  const handleInputBlur = () => {
    if (title.trim() === "") {
      setTitle("Untitled Task");
      updateTaskTitle(columnKey, task.id, "Untitled Task");
    } else {
      updateTaskTitle(columnKey, task.id, title);
    }
    toggleEditMode(columnKey, task.id, false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleInputBlur();
    }
  };

  const handleDoubleClick = () => {
    toggleEditMode(columnKey, task.id, true);
  };

  const handleDragStartWithCheck = (e) => {
    if (task.isEditing) {
      e.preventDefault();
      return false;
    }
    onDragStart(e);
  };

  if (task.isEditing) {
    return (
      <TaskContainer $color={task.color} $isEditing={true}>
        <TaskInput
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder="Enter task name"
        />
      </TaskContainer>
    );
  }

  return (
    <TaskContainer
      $color={task.color}
      $isEditing={false}
      draggable={!task.isEditing}
      onDragStart={handleDragStartWithCheck}
      onDragEnd={onDragEnd}
      onDoubleClick={handleDoubleClick}
    >
      <TaskText>{task.title}</TaskText>
    </TaskContainer>
  );
}
