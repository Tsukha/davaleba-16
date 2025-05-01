import { useState, useRef } from "react";
import styled from "styled-components";
import Column from "./Column";
import DeleteZone from "./DeleteZone";
import { useTaskContext } from "./TaskContext";

const BoardContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 72rem;
`;

const ColumnsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

export default function board() {
  const { tasks, moveTask, deleteTask } = useTaskContext();
  const [isDragging, setIsDragging] = useState(false);
  const [draggedTask, setDraggedTask] = useState(null);
  const [showDeleteZone, setShowDeleteZone] = useState(false);
  const draggedNodeRef = useRef(null);

  const handleDragStart = (e, task, columnKey) => {
    // Skip drag start if the task is being edited
    if (task.isEditing) {
      e.preventDefault();
      return;
    }

    draggedNodeRef.current = e.target;

    setIsDragging(true);
    setDraggedTask({ task, fromColumn: columnKey });
    setShowDeleteZone(true);

    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({
        taskId: task.id,
        fromColumn: columnKey,
      })
    );

    setTimeout(() => {
      if (draggedNodeRef.current) {
        draggedNodeRef.current.style.opacity = 0.4;
      }
    }, 0);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setShowDeleteZone(false);

    if (draggedNodeRef.current) {
      draggedNodeRef.current.style.opacity = 1;
    }

    draggedNodeRef.current = null;
  };

  const handleDragOver = (e, columnKey) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = "#f9fafb";
  };

  const handleDragLeave = (e) => {
    e.currentTarget.style.backgroundColor = "white";
  };

  const handleDrop = (e, columnKey) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = "white";

    const data = e.dataTransfer.getData("text/plain");
    if (!data) return;

    try {
      const { taskId, fromColumn } = JSON.parse(data);

      if (fromColumn === columnKey) return;

      moveTask(taskId, fromColumn, columnKey);
    } catch (err) {
      console.error("Error processing drop:", err);
    }

    setIsDragging(false);
    setShowDeleteZone(false);
  };

  const handleDeleteDrop = (e) => {
    e.preventDefault();

    const data = e.dataTransfer.getData("text/plain");
    if (!data) return;

    try {
      const { taskId, fromColumn } = JSON.parse(data);

      deleteTask(fromColumn, taskId);
    } catch (err) {
      console.error("Error processing delete drop:", err);
    }

    setIsDragging(false);
    setShowDeleteZone(false);
  };

  return (
    <BoardContainer>
      <ColumnsWrapper>
        {Object.keys(tasks).map((columnKey) => (
          <Column
            key={columnKey}
            columnKey={columnKey}
            onDragOver={(e) => handleDragOver(e, columnKey)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, columnKey)}
            handleDragStart={(e, task) => handleDragStart(e, task, columnKey)}
            handleDragEnd={handleDragEnd}
          />
        ))}
      </ColumnsWrapper>

      {showDeleteZone && (
        <DeleteZone
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={handleDeleteDrop}
        />
      )}
    </BoardContainer>
  );
}
