import { createContext, useState, useContext } from "react";

const TaskContext = createContext();

export const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({
    backlog: [],
    inProgress: [],
    done: [],
  });

  const addNewTask = (columnKey) => {
    const newId = `task${Date.now()}`;

    setTasks((prev) => ({
      ...prev,
      [columnKey]: [
        ...prev[columnKey],
        {
          id: newId,
          title: "",
          color: getRandomColor(),
          isEditing: true,
        },
      ],
    }));
  };

  const updateTaskTitle = (columnKey, taskId, newTitle) => {
    setTasks((prev) => ({
      ...prev,
      [columnKey]: prev[columnKey].map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      ),
    }));
  };

  const toggleEditMode = (columnKey, taskId, isEditing) => {
    setTasks((prev) => ({
      ...prev,
      [columnKey]: prev[columnKey].map((task) =>
        task.id === taskId ? { ...task, isEditing } : task
      ),
    }));
  };

  const moveTask = (taskId, fromColumn, toColumn) => {
    if (fromColumn === toColumn) return;

    const taskToMove = tasks[fromColumn].find((task) => task.id === taskId);

    if (!taskToMove) return;

    setTasks((prev) => ({
      ...prev,
      [fromColumn]: prev[fromColumn].filter((task) => task.id !== taskId),
      [toColumn]: [...prev[toColumn], taskToMove],
    }));
  };

  const deleteTask = (columnKey, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [columnKey]: prev[columnKey].filter((task) => task.id !== taskId),
    }));
  };

  const getRandomColor = () => {
    const colors = ["purple", "indigo", "teal", "cyan", "pink", "orange"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addNewTask,
        updateTaskTitle,
        toggleEditMode,
        moveTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
