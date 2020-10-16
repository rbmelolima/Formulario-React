import styled from 'styled-components';

export const Page = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-ice);
`;

export const Form = styled.form`
  width: 100%;
  max-width: 600px;  
  margin: 32px 8px;
  padding: 24px;
  background: #fff;
  border-radius: 4px;
  -webkit-box-shadow: 4px 4px 8px 0px rgba(33,33,33,0.08);
  -moz-box-shadow: 4px 4px 8px 0px rgba(33,33,33,0.08);
  box-shadow: 4px 4px 8px 0px rgba(33,33,33,0.08);

  @media screen and (max-width: 450px){
    padding: 24px 16px;
  }
`;

export const Title = styled.legend`
  font-size: 24px;
  color: var(--color-blue-dark);
  font-weight: 700;
  margin-bottom: 32px;
  text-align: center;
`;

export const ContainerAddMoreCities = styled.div`
  padding-bottom: 8px;
  margin-bottom: 16px;  
  width: 100%;
  display: flex;
  justify-content: space-between; 

  span {
    color: var(--text);
    font-size: 14px;
  }
`;

export const BtnAddMoreCities = styled.button`
  font-size: 14px; 
  color: var(--color-blue);
  background: none;
  outline: none !important;
  border: none !important;
`;

export const Inline = styled.div`
  display: inline-flex !important;

  button {
    margin-right: 8px;
  }
`;

export const Logo = styled.img`
  width: 100%; 
  height: auto; 
  min-height: 60px;
  margin-bottom: 24px;
`;

export const InputsContainer = styled.section``;

export const ContentForm = styled.fieldset``;

export const Region = styled.div`
`;

