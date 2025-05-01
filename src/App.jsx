import styled from "styled-components";
import Board from "./components/board";
import { TaskProvider } from "./components/TaskContext";

const AppContainer = styled.div`
  padding: 1rem;
  background-color: #f3f4f6;
  min-height: 92vh;
  display: flex;
  justify-content: center;
`;

export default function App() {
  return (
    <TaskProvider>
      <AppContainer>
        <Board />
      </AppContainer>
    </TaskProvider>
  );
}
