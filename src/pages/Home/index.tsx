import { Form } from '@unform/web';
import { FiUser, FiLock } from 'react-icons/fi';
import * as yup from 'yup';
import { useRef } from 'react';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import styles from './styles.module.scss';

import logo from '../../assets/logo.jpg';
import { getValidationErrors } from '../../utils/getValidationErrors';

const Home = () => {
  const formRef = useRef<FormHandles>(null);
  // eslint-disable-next-line no-useless-escape
  const validatePassword = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;

  const handleSubmit = async (data: object) => {
    console.log(data);
    try {
      formRef.current?.setErrors({});

      const schema = yup.object().shape({
        user: yup.string().required('Digite o nome do seu usuário'),
        password: yup
          .string()
          .min(8, 'A senha deve conter no mínimo 8 dígitos')
          .matches(
            validatePassword,
            'A senha deve conter um número, uma letra e um caractere especial.'
          )
          .required('Senha obrigatória.'),
        passwordConfirmation: yup
          .string()
          .oneOf(
            [yup.ref('password'), null],
            'Os campos de senhas devem ser iguais'
          )
      });

      await schema.validate(data, {
        abortEarly: false
      });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    }
  };

  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <img src={logo} alt="elogroup" />
        <h1>Elogroup</h1>
      </header>
      <Form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
        <Input name="user" labelName="Usuário" icon={FiUser} />
        <Input
          name="password"
          type="password"
          labelName="Senha"
          icon={FiLock}
        />
        <Input
          name="passwordConfirmation"
          type="password"
          labelName="Confirmação de senha"
        />
        <button type="submit">Registrar</button>
      </Form>
    </div>
  );
};
export default Home;
