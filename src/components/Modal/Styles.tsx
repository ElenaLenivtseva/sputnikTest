import styled from "styled-components";

export const MyModal = styled.div<{opacity: string; visibility: string}>`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => props.opacity};
  visibility: ${(props) => props.visibility};
`

export const MyModalContent = styled.div<{opacity: string; visibility: string; transform: string}>`
  width: 400px;
  background: #fafafa;
  position: absolute;
  transition: all 0.5s ease-in-out;
  transition-delay: 0.2s;
  opacity: ${(props) => props.opacity};
  visibility: ${(props) => props.visibility};
  transform: ${(props) => props.transform};
`;

export const MyModalTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;


export const MyModalHeader = styled.div`
  color: white;
  background: #135fb4;
  padding: 1rem;
`;

export const MyModalBody = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: center;
`;

export const MyModalButton = styled.button<{ bg: string }>`
  color: white;
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  font-size: 1.2rem;
  margin-right: 1rem;
  background: ${(props) => props.bg || "black"};
`;


