import styled from "styled-components";
import { Trash2 } from "lucide-react";

const DeleteContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fee2e2;
  border: 2px dashed #ef4444;
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 80px;
`;

const DeleteText = styled.span`
  color: #ef4444;
  font-weight: 500;
  margin-left: 0.5rem;
`;

export default function DeleteZone({ onDragOver, onDrop }) {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <DeleteContainer onDragOver={onDragOver} onDrop={onDrop}>
      <Trash2 size={24} color="#ef4444" />
      <DeleteText>Drop to delete</DeleteText>
    </DeleteContainer>
  );
}
