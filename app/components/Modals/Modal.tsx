"use client";

import { useGlobalState } from "@/app/context/globalProvider";
import styled from "styled-components";

interface ModalProps {
  content: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ content }) => {
  const { closeModal, theme } = useGlobalState();

  return (
    <ModalStyled theme={theme}>
      <div className="modal-overlay" onClick={closeModal}></div>
      <div className="modal-content">{content}</div>
    </ModalStyled>
  );
};

const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.45);
    filter: blur(4px);
  }

  .modal-content {
    padding: 2rem;
    position: relative;
    max-width: 630px;
    width: 100%;
    height: 90vh;
    overflow-y: auto;
    scrollbar-width: auto;
    z-index: 100;
    border-radius: 1rem;
    background-color: ${(props) => props.theme.colorBg2};

    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
    border-radius: ${(props) => props.theme.borderRadiusMd2};

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: #ffffff;
      border-radius: 9999px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #cccccc;
      border-radius: 9999px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #b8b8b8;
    }

    &::-webkit-scrollbar-button {
      display: none;
    }
  }
`;

export default Modal;
