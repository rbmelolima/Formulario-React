/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Btn, BtnInfo } from './styles';
import { BsQuestion } from 'react-icons/bs';
import { Popover, PopoverBody } from 'reactstrap';

interface Props extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  text: string;
  type: "submit" | "button" | "reset";
};

interface ButtonInfoProps {
  message: string;
}

const Button: React.FC<Props> = ({ text, type, ...rest }) => {
  return <Btn { ...rest } type={ type }>{ text }</Btn>;
};


export const ButtonInformation: React.FC<ButtonInfoProps> = ({ message }) => {
  const [ popoverOpen, setPopoverOpen ] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <React.Fragment>
      <BtnInfo id={ "popover" } type="button">
        <BsQuestion />
      </BtnInfo>

      <Popover placement="bottom" isOpen={ popoverOpen } target={ "popover" } toggle={ toggle }>
        <PopoverBody>
          { message }
        </PopoverBody>
      </Popover>
    </React.Fragment>
  );
};

export default Button;