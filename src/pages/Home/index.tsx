import { useRef, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import { useHistory } from 'react-router-dom';

import * as yup from 'yup';
import { FiUser, FiLock, FiUnlock } from 'react-icons/fi';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import styles from './styles.module.scss';
import Input from '../../components/Input';
import logo from '../../assets/logo.jpg';

import { getValidationErrors } from '../../utils/getValidationErrors';
import { Data } from '../../utils/types';

const Home = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const handleShowPassword = () => setShowPassword((prevState) => !prevState);

  const history = useHistory();
  // eslint-disable-next-line no-useless-escape
  const validatePassword = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;

  const handleSubmit = async (data: Data) => {
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

      setDisabledButton(true);
      localStorage.setItem('user', data.user);
      toast.success('Cadastro realizado!');

      setTimeout(() => {
        history.push('dashboard');
      }, 5000);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    }
  };
  const handleIconPassword = () => {
    if (showPassword) {
      return (
        <FiUnlock onClick={handleShowPassword} style={{ cursor: 'pointer' }} />
      );
    }
    return (
      <FiLock onClick={handleShowPassword} style={{ cursor: 'pointer' }} />
    );
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
          type={showPassword ? '' : 'password'}
          labelName="Senha"
          icon={handleIconPassword}
        />
        <Input
          name="passwordConfirmation"
          type={showPassword ? '' : 'password'}
          labelName="Confirmação de senha"
          icon={handleIconPassword}
        />
        <button type="submit" disabled={disabledButton}>
          Registrar
        </button>
      </Form>
      <ToastContainer />
    </div>
  );
};
export default Home;
