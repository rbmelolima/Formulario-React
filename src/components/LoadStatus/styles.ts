import styled from 'styled-components';

const Block = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  margin: 24px 0;
  font-weight: bold;
`;

export const Sucess = styled(Block)`
  color: var(--color-green);
`;

export const Error = styled(Block)`
  color: var(--color-red);
`;
