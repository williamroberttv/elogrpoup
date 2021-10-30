import { Form } from '@unform/web';
import { FiUser, FiLock } from 'react-icons/fi';
import Input from '../../components/Input';
import styles from './styles.module.scss';

import logo from '../../assets/logo.jpg';

const Home = () => {
  const handleSubmit = (data: object) => {
    console.log(data);
  };
  return (
    <div className={styles.homeContainer}>
      <header className={styles.header}>
        <img src={logo} alt="elogroup" />
        <h1>Elogroup</h1>
      </header>
      <Form onSubmit={handleSubmit}>
        <Input name="user" labelName="Usuário" icon={FiUser} />
        <Input
          name="password"
          type="password"
          labelName="Senha"
          icon={FiLock}
        />
        <Input
          name="confirmation"
          type="password"
          labelName="Confirmação de senha"
        />
        <button type="submit">Registrar</button>
      </Form>
    </div>
  );
};
export default Home;
