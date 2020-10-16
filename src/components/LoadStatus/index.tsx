import React from 'react';
import Spinner from '../Spinner';

import { Sucess, Error } from './styles';

export interface paramsLoadStatus {
  status: "sucess" | "error" | "loading" | "none" | "invalid";
}

const LoadStatus: React.FC<paramsLoadStatus> = ({ status }) => {
  if(status === "loading") {
    return <Spinner />;
  }

  else if(status === "sucess") {
    return <Sucess>Seu cadastro foi efetuado com sucesso!</Sucess>;
  }

  else if(status === "error") {
    return <Error>Falha ao cadastrar, tente novamente!</Error>;
  }

  else if(status === "invalid") {
    return <Error>Preencha atentamente todos os campos!</Error>;
  }

  else {
    return <></>;
  }
};

export default LoadStatus;