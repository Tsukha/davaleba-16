import styled from "styled-components";
import Task from "./Task";
import { useTaskContext } from "./TaskContext";

const ColumnContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  width: 33.333%;
  display: flex;
  flex-direction: column;
`;

const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ColumnTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #4b5563;
`;

const TaskCount = styled.span`
  margin-left: 0.5rem;
  color: #6b7280;
`;

const columnColors = {
  backlog: "#ef4444",
  inProgress: "#eab308",
  done: "#22c55e",
};

const ColorBar = styled.div`
  margin-left: 1rem;
  height: 0.25rem;
  flex-grow: 1;
  border-radius: 9999px;
  background-color: ${(props) => columnColors[props.$columnType] || "#d1d5db"};
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
`;

const AddButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 9999px;
  background-color: #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  margin-top: 0.5rem;
  align-self: center;

  &:hover {
    background-color: #d1d5db;
  }
`;

export default function Column({
  columnKey,
  onDragOver,
  onDragLeave,
  onDrop,
  handleDragStart,
  handleDragEnd,
}) {
  const { tasks, addNewTask } = useTaskContext();

  const getColumnTitle = (key) => {
    switch (key) {
      case "backlog":
        return "Backlog";
      case "inProgress":
        return "In Progress";
      case "done":
        return "Done";
      default:
        return key;
    }
  };

  return (
    <ColumnContainer
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <ColumnHeader>
        <ColumnTitle>{getColumnTitle(columnKey)}</ColumnTitle>
        <TaskCount>| {tasks[columnKey].length}</TaskCount>
        <ColorBar $columnType={columnKey} />
      </ColumnHeader>

      <TaskList>
        {tasks[columnKey].map((task) => (
          <Task
            key={task.id}
            task={task}
            columnKey={columnKey}
            onDragStart={(e) => handleDragStart(e, task)}
            onDragEnd={handleDragEnd}
          />
        ))}
      </TaskList>

      <AddButton onClick={() => addNewTask(columnKey)}>+</AddButton>
    </ColumnContainer>
  );
}
