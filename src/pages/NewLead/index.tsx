import { useState } from 'react';
import { Form } from '@unform/web';
import { MdEmail, MdPhone } from 'react-icons/md';

import { Scope } from '@unform/core';
import Input from '../../components/Input';
import logo from '../../assets/logo.jpg';
import styles from './styles.module.scss';
import Checkbox from '../../components/Checkbox';

interface NewLeadProps {
  name: string;
  contact: string;
  email: string;
  categories: {
    rpa: boolean;
    bpm: boolean;
    analytics: boolean;
    produtoDigital: boolean;
  };
}

const NewLead = () => {
  const [checkedBoxes, setCheckedBoxes] = useState<string[]>([]);

  const checkAllBoxes = () => {
    if (checkedBoxes.length === 0) {
      setCheckedBoxes(['rpa', 'bpm', 'produtoDigital', 'analytics']);
    } else {
      setCheckedBoxes([]);
    }
  };
  const handleNewLead = (data: NewLeadProps) => {
    console.log(data);
    const { categories } = data;

    const getCategories = [
      categories.bpm && 'rpa',
      categories.bpm && 'bpm',
      categories.produtoDigital && 'Produto digital',
      categories.analytics && 'analytics'
    ];

    const formatedCategories = getCategories.filter((item) => item);
    const formatedData = {
      name: data.name,
      email: data.email,
      contact: data.contact,
      categories: formatedCategories
    };
    console.log(formatedData);
  };
  return (
    <Form onSubmit={handleNewLead}>
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
        <Checkbox
          name="checkall"
          description="Marcar Todos"
          onChange={checkAllBoxes}
        />
        <Scope path="categories">
          <Checkbox
            description="RPA"
            checked={checkedBoxes.includes('rpa') ? true : undefined}
            name="rpa"
          />
          <Checkbox
            description="Produto digital"
            checked={checkedBoxes.includes('produtoDigital') ? true : undefined}
            name="produtoDigital"
          />
          <Checkbox
            description="Analytics"
            checked={checkedBoxes.includes('analytics') ? true : undefined}
            name="analytics"
          />
          <Checkbox
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
