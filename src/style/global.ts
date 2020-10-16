import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box !important;
    font-family: 'Roboto', sans-serif;
    transition: 0.3s ease-in-out all;
  }

  a,
  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  body, #root, html {
    width: 100%;
    min-height: 100vh;
  } 

  label {
    color: var(--text);
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 700;
  }
  
  :root {      
    --color-blue: #0055ff;
    --color-blue-dark: #013350;
    --color-green: #00df80; 
    --color-green-dark: #00BF6C; 
    --color-red: #ff001c;
    --color-ice: #fafafa;    
    --text: #000000;    
    --input-background: #f9f9fa;    
    --input-border-default: #e3e9e9;
    --input-border-active: #0055ff;
    --input-border-error: #ff001c;
    --alert-error-background: #ffe9ec;    
  }
`;