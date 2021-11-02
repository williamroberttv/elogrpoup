import { useState, useContext, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles, Scope } from '@unform/core';
import * as yup from 'yup';
import { MdEmail, MdPhone } from 'react-icons/md';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import styles from './styles.module.scss';
import Input from '../../components/Input';
import Header from '../../components/Header';
import Checkbox from '../../components/Checkbox';
import { NewLeadProps } from '../../utils/types';
import { LeadContext } from '../../context/leadContext';
import { getValidationErrors } from '../../utils/getValidationErrors';

const NewLead = () => {
  const [checkedBoxes, setCheckedBoxes] = useState<string[]>([]);
  const [disabledButton, setDisabledButton] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const checkAllBoxes = () => {
    if (checkedBoxes.length === 0) {
      setCheckedBoxes(['rpa', 'bpm', 'produtoDigital', 'analytics']);
    } else {
      setCheckedBoxes([]);
    }
  };
  const { getNewLead } = useContext(LeadContext);

  const handleNewLead = async (data: NewLeadProps) => {
    try {
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

      formRef.current?.setErrors({});

      const schema = yup.object().shape({
        name: yup.string().required('Digite o nome da empresa'),
        email: yup.string().required('E-mail obrigatório'),
        contact: yup.string().required('Digite um telefone para contato')
      });

      await schema.validate(data, {
        abortEarly: false
      });

      setDisabledButton(true);
      getNewLead(formatedData);
      toast.success('Novo lead cadastrado com sucesso!');

      setTimeout(() => history.push('dashboard'), 5000);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    }
  };

  return (
    <Form onSubmit={handleNewLead} ref={formRef}>
      <div className={styles.infoContainer}>
        <Link to="dashboard">
          <Header />
        </Link>
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
        <button type="submit" disabled={disabledButton}>
          Salvar
        </button>
      </div>
      <ToastContainer />
    </Form>
  );
};
export default NewLead;
