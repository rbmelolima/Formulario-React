import React, { useState } from 'react';
import { InputFileContainer } from '../style';

interface Props {
  label: string;
  getFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const File: React.FC<Props> = ({ label }) => {
  const [ nameFile, setNameFile ] = useState<string>('Nenhum arquivo foi selecionado');

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;

    if(files !== null) {
      const name = files[ 0 ].name;
      setNameFile(name);
    }
  }

  return (
    <InputFileContainer>
      <label htmlFor="logo">
        { label }
      </label>

      <p>
        { nameFile }
      </p>

      <input
        type="file"
        name="logo"
        id="logo"
        accept="image/*"
        onChange={ handleFile }
      />
    </InputFileContainer>
  );
};

export default File;