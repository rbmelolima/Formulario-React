import React, { InputHTMLAttributes } from 'react';
import { InputMaskedContainer, InputBlock, ErrorBlock } from '../style';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  secondLabel?: string;
  name: string;
  error: boolean;
  helperText?: string;
  mask: string | (string | RegExp)[];
}

const InputMasked: React.FC<InputProps> = ({ label, name, secondLabel, error, helperText, mask, ...rest }) => {
  return (
    <InputBlock>
      <label htmlFor={ name }> { label } <span>{ secondLabel }</span></label>
      <InputMaskedContainer
        mask={mask}        
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

export default InputMasked;