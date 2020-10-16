import styled from 'styled-components';

export const Btn = styled.button`
  width: 100%;
  padding: 16px;
  background: #212121;
  color: #fff;
  font-size: 16px;
  border-radius: 8px;
  outline: none !important;
  border: none !important;

  &:hover,
  &:active{
    background: #000000;
  }
`;

export const BtnInfo = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-radius: 100%;
  background: var(--input-border-default);
  transition: all ease-in-out 0.3s;
  color: #000;
  outline: none !important;
  border: none !important;

  svg {
    width: 100%;
    height: auto;
    color: var(--color-primary);
  } 
`;
