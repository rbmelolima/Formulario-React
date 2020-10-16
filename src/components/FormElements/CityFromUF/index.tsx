import React, { useState, useEffect } from 'react';
import { Region } from '../../../pages/Home/styles';
import Select from '../Select';
import { getUFsLocalJson } from '../../../service/IBGE/localDatabase';
import { fetchCitiesFromUF } from '../../../service/IBGE';

interface Props {
  insertCity: (city: string, index: number) => void;
  keyComponent: number;
}

const CityFromUF: React.FC<Props> = ({ insertCity, keyComponent }) => {
  const [ selectUF, setSelectUF ] = useState<string>("");
  const [ selectNameUF, setSelectNameUF ] = useState<string>("");
  const [ selectCity, setSelectCity ] = useState<string>("");

  const [ cities, setCities ] = useState<any>([]);

  const [ disabledCitiesInput, setDisabled ] = useState<boolean>(false);

  /// Load Cities from UF
  useEffect(() => {
    if(selectUF !== "" && selectUF !== '-999') {
      fetchCitiesFromUF(Number(selectUF)).then((value => {
        const allCities = value;
        allCities.unshift({ value: "-999", label: "Todos as cidades" });
        setCities(allCities);
      }));
    }

    if(selectUF === '-999') {
      setDisabled(true);
      insertCity("Todos os Estados", keyComponent);
    }

    else {
      setDisabled(false);
    }
  }, [ selectUF, insertCity, keyComponent ]);

  function handleSelectCity(e: React.ChangeEvent<HTMLSelectElement>) {
    const index = e.target.selectedIndex;
    const city = e.target[ index ].textContent;

    if(city !== null) {
      setSelectCity(e.target.value);
      const cityWithUF = `${ city } - ${ selectNameUF }`;
      insertCity(cityWithUF, keyComponent);
    }
  }

  function getUFs() {
    const options = getUFsLocalJson();
    options.unshift({ value: "-999", label: "Todos os Estados" });
    return options;
  }

  return (
    <Region>
      <Select
        error={ false }
        name="estado"
        label="Estado"
        placeholder="Selecione um Estado"
        value={ selectUF }
        options={ getUFs() }
        onChange={ (e) => {
          const id = e.target.value;
          const index = e.target.selectedIndex;
          const name = e.target[ index ].textContent;

          setSelectNameUF(name ?? "");
          setSelectUF(id);
        } }
      />

      {
        selectUF !== '' && <Select
          disabled={ disabledCitiesInput }
          error={ false }
          name="cidade"
          label="Cidade"
          placeholder="Selecione uma cidade"
          value={ selectCity }
          onChange={ (e) => handleSelectCity(e) }
          options={ cities }
        />
      }
    </Region>
  );
};

export default CityFromUF;