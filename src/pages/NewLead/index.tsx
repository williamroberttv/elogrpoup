import { useState } from 'react';
import { Form } from '@unform/web';
import { MdEmail, MdPhone } from 'react-icons/md';

import { Scope } from '@unform/core';
import Input from '../../components/Input';
import logo from '../../assets/logo.jpg';
import styles from './styles.module.scss';
import InputCheck from '../../components/InputCheck';

const NewLead = () => {
  const [checkedBoxes, setCheckedBoxes] = useState<string[]>([]);

  const checkAllBoxes = () => {
    if (checkedBoxes.length === 0) {
      setCheckedBoxes(['rpa', 'bpm', 'produto digital', 'analytics']);
    } else {
      setCheckedBoxes([]);
    }
  };

  return (
    <Form onSubmit={(data) => console.log(data)}>
      <div className={styles.infoContainer}>
        <header>
          <img src={logo} alt="logo elogroup" />
          <h1>EloGroup</h1>
        </header>
        <Input name="name" labelName="Nome" />
        <Input name="contact" labelName="Telefone" icon={MdPhone} />
        <Input name="email" type="email" labelName="E-mail" icon={MdEmail} />
      </div>
      <div className={styles.checkboxContainer}>
        <header>
          <h1>Novo Lead</h1>
        </header>
        <InputCheck
          name="checkall"
          description="Marcar Todos"
          onChange={checkAllBoxes}
        />
        <Scope path="categories[rpa]">
          <InputCheck
            description="RPA"
            checked={checkedBoxes.includes('rpa') ? true : undefined}
            name="rpa"
          />
        </Scope>
        <Scope path="categories[produto digital]">
          <InputCheck
            description="Produto digital"
            checked={
              checkedBoxes.includes('produto digital') ? true : undefined
            }
            name="produto digital"
          />
        </Scope>
        <Scope path="categories[analytics]">
          <InputCheck
            description="Analytics"
            checked={checkedBoxes.includes('analytics') ? true : undefined}
            name="analytics"
          />
        </Scope>
        <Scope path="categories[bpm]">
          <InputCheck
            description="BPM"
            checked={checkedBoxes.includes('bpm') ? true : undefined}
            name="bpm"
          />
        </Scope>
        <button type="submit">Salvar</button>
      </div>
    </Form>
  );
};
export default NewLead;
