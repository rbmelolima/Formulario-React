import React, { useEffect, useState, FormEvent } from 'react';
import { fetchCitiesFromUF } from '../../service/IBGE';
import { getUFsLocalJson } from '../../service/IBGE/localDatabase';
import LoadStatus from '../../components/LoadStatus';
import { GlobalStyle } from '../../style/global';
import { ButtonInformation } from '../../components/FormElements/Button';
import { Button, CityFromUF, Input, InputMasked, Select, File } from '../../components/FormElements';
import {
  Page, Form,
  ContentForm,
  Title, InputsContainer,
  Region, 
  BtnAddMoreCities, ContainerAddMoreCities, Inline
} from './styles';

const Home: React.FC = () => {
  //const mask = "[0-9]{0,1}[0-9]{4}-[0-9]{4}"; 
  const [ UFs, setUFs ] = useState<any>([]);
  const [ cities, setCities ] = useState<any>([]);
  const [ selectUF, setSelectUF ] = useState<string>("");
  const [ selectCity, setSelectCity ] = useState<string>("");
  const [ statusForm, setStatusForm ] = useState<
    "sucess" | "error" | "loading" | "none" | "invalid"
  >("none");
  // The user will store more cities here
  const [ citiesServed, setCitiesServed ] = useState<string[]>([]);
  const [ formdata, setFormdata ] = useState({
    razaoSocial: "",
    nomeFantasia: "",
    telefone: "",
    whatsapp: "",
    cidade: "",
    estado: "",
    endereco: "",
    categoria: "",
    site: "",
    descricaoEmpresa: ""
  });
  const [ errorFormData, setErrorFormData ] = useState({
    razaoSocial: false,
    nomeFantasia: false,
    telefone: false,
    cidade: false,
    estado: false,
    endereco: false,
    categoria: false,
    site: false,
    descricaoEmpresa: false
  });

  useEffect(() => {
    const value = getUFsLocalJson();
    setUFs(value);
  }, []);

  useEffect(() => {
    if(selectUF !== "") {
      fetchCitiesFromUF(Number(selectUF)).then((value => setCities(value)));
    }
  }, [ selectUF ]);

  function addMoreCities(city: string, index: number) {
    const cities = citiesServed;
    cities[ index ] = city;
    setCitiesServed(cities);
  }

  function resizeArrayCitiesServed() {
    setCitiesServed([
      ...citiesServed,
      ''
    ]);
  }

  function handleSubmitForm(event: FormEvent) {
    event.preventDefault();
    setStatusForm("loading");

    if(handleInvalidInputs()) {
      setStatusForm("invalid");
      return;
    }

    //Remover este setTimeout
    setTimeout(() => {
      resetErrors();
      setStatusForm("sucess");

      const data = {
        ...formdata,
        cidadesAtendidas: citiesServed
      };

      console.info("DADOS DO FORMULÁRIO ", data);
    }, 1000);
  }

  function handleInvalidInputs(): boolean {
    resetErrors();

    let hasErrors = false;
    let cloneErrorForm = errorFormData;

    const arrayObjForm = [
      { name: "descricaoEmpresa", value: formdata.descricaoEmpresa },
      { name: "endereco", value: formdata.endereco },
      { name: "nomeFantasia", value: formdata.nomeFantasia },
      { name: "razaoSocial", value: formdata.razaoSocial },
      { name: "telefone", value: formdata.telefone },
      { name: "site", value: formdata.site },
      { name: "cidade", value: formdata.cidade },
      { name: "estado", value: formdata.estado },
      { name: "categoria", value: formdata.categoria },

    ];

    arrayObjForm.forEach((element): void => {
      const { name, value } = element;
      if(isEmpty(value)) {
        cloneErrorForm = ({ ...cloneErrorForm, [ name ]: true });
        hasErrors = true;
      }
    });

    setErrorFormData(cloneErrorForm);

    return hasErrors;
  }

  function resetErrors() {
    setErrorFormData({
      razaoSocial: false,
      nomeFantasia: false,
      telefone: false,
      cidade: false,
      estado: false,
      endereco: false,
      site: false,
      categoria: false,
      descricaoEmpresa: false
    });
  }

  function isEmpty(value: any): boolean {
    if(value === null || String(value) === '' || String(value).length <= 0) {
      return true;
    }

    return false;
  }

  return (
    <React.Fragment>
      <Page>
        <Form onSubmit={ handleSubmitForm }>         
          <ContentForm>
            <Title>
              Cadastro
            </Title>

            <InputsContainer>
              <Input
                label="Razão social"
                name="razaoSocial"
                placeholder=""
                error={ errorFormData.razaoSocial }
                helperText={ "Insira a razão social da empresa" }
                onChange={ (e) => {
                  const { value } = e.target;
                  setFormdata({
                    ...formdata,
                    razaoSocial: value
                  });
                } }
              />

              <Input
                label="Nome fantasia"
                name="nomeFantasia"
                placeholder=""
                error={ errorFormData.nomeFantasia }
                helperText={ "Insira o nome fantasia da empresa" }
                onChange={ (e) => {
                  const { value } = e.target;
                  setFormdata({
                    ...formdata,
                    nomeFantasia: value
                  });
                } }
              />

              <InputMasked
                mask={ "(99) 9999-9999" }
                label="Telefone fixo"
                type="tel"
                name="telefone"
                placeholder=""
                error={ errorFormData.telefone }
                helperText={ "Insira um telefone válido" }
                onChange={ (e) => {
                  const { value } = e.target;
                  setFormdata({
                    ...formdata,
                    telefone: value
                  });
                } }
              />

              <Input
                name="whatsapp"
                label="Telefone celular"
                type="tel"
                maxLength={ 13 }
                minLength={ 12 }
                secondLabel="Opcional"
                placeholder=""
                error={ false }
                onChange={ (e) => {
                  const { value } = e.target;
                  setFormdata({
                    ...formdata,
                    whatsapp: value
                  });
                } }
              />

              <Region>
                <Input
                  label="Endereço Matriz"
                  name="endereco"
                  error={ errorFormData.endereco }
                  helperText={ "Insira um endereço" }
                  placeholder=""
                  onChange={ (e) => {
                    const { value } = e.target;
                    setFormdata({
                      ...formdata,
                      endereco: value
                    });
                  } }
                />


                <Select
                  name="estado"
                  label="Estado"
                  placeholder="Selecione um Estado"
                  value={ selectUF }
                  options={ UFs }
                  error={ errorFormData.estado }
                  helperText={ "Selecione um Estado" }
                  onChange={ (e) => {
                    const idUF = e.target.value;
                    const index = e.target.selectedIndex;
                    const nameUF = e.target[ index ].textContent;
                    setFormdata({ ...formdata, estado: nameUF ?? idUF });
                    setSelectUF(idUF);
                  } }
                />

                {
                  selectUF !== "" && <Select
                    name="cidade"
                    label="Cidade"
                    placeholder="Selecione uma cidade"
                    error={ errorFormData.cidade }
                    helperText={ "Selecione uma cidade" }
                    value={ selectCity }
                    onChange={ (e) => {
                      const index = e.target.selectedIndex;
                      const nameCity = e.target[ index ].textContent;
                      setSelectCity(e.target.value);
                      setFormdata({ ...formdata, cidade: nameCity ?? "-" });
                    }
                    }
                    options={ cities }
                  />
                }

              </Region>

              <Region>
                {
                  citiesServed.map((item, index) => {
                    return (<CityFromUF key={ index } insertCity={ addMoreCities } keyComponent={ index } />);
                  })
                }

                <ContainerAddMoreCities>
                  <Inline>
                    <BtnAddMoreCities type="button" onClick={ resizeArrayCitiesServed }>
                      Adicionar outra cidade
                    </BtnAddMoreCities>

                    <ButtonInformation
                      message={ "Caso queira adicionar outra cidade e Estado" }
                    />
                  </Inline>

                  <span>Opcional</span>
                </ContainerAddMoreCities>
              </Region>
              
              <Input
                name="site"
                type="url"
                label="Site da empresa"
                placeholder=""
                error={ errorFormData.site }
                helperText={ "Insira o site da sua empresa" }
                onChange={ (e) => {
                  const { value } = e.target;
                  setFormdata({
                    ...formdata,
                    site: value
                  });
                } }
              />

              <Input
                label="Descrição da empresa"
                name="descricaoEmpresa"
                placeholder=""
                error={ errorFormData.descricaoEmpresa }
                helperText={ "Insira uma descrição sobre a empresa" }
                onChange={ (e) => {
                  const { value } = e.target;
                  setFormdata({
                    ...formdata,
                    descricaoEmpresa: value
                  });
                } }
              />

              <File
                label={ "Adicionar logo" }
              />

              <Button text="Cadastrar" type="submit" />
              <LoadStatus status={ statusForm } />
            </InputsContainer>
          </ContentForm>
        </Form>
      </Page>
      <GlobalStyle />
    </React.Fragment>
  );
};

export default Home;