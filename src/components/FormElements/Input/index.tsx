import React, { InputHTMLAttributes } from 'react';
import { InputContainer, InputBlock, ErrorBlock } from '../style';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  secondLabel?: string;
  name: string;
  error: boolean;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({ label, name, secondLabel, error, helperText, ...rest }) => {
  return (
    <InputBlock>
      <label htmlFor={ name }> { label } <span>{ secondLabel }</span></label>
      <InputContainer
        type="text"
        name={ name }
        id={ name }
        { ...rest }
        className={ error === true ? "error" : "" }
      />
      {
        error === true ? <ErrorBlock>{ helperText }</ErrorBlock> : <></>
      }
    </InputBlock>
  );
};

export default Input;