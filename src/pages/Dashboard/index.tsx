import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { useDrop } from 'react-dnd';
import styles from './styles.module.scss';
import Card from '../../components/Card';
import { LeadContext } from '../../context/leadContext';

const Dashboard = () => {
  const user = localStorage.getItem('user');
  const { leads } = useContext(LeadContext);
  const [confirmed, setConfirmed] = useState<string[]>(['Kil']);
  const [agend, setAgend] = useState<string[]>(['Mila']);
  const [, drop] = useDrop(() => ({
    accept: 'CARD',
    hover(item) {
      console.log(item);
    }
  }));

  return (
    <div>
      <h1>Bem vindo {user}</h1>
      <button type="button">
        <Link to="/newlead">Novo Lead (+)</Link>
      </button>
      <div className={styles.board}>
        <div className={styles.boardContainer}>
          <header>
            <p>Cliente em potencial</p>
          </header>
          {leads.map((item) => (
            <Card key={item.name} title={item.name} />
          ))}
        </div>
        <div className={styles.boardContainer} ref={drop}>
          <header>
            <p>Dados confirmados</p>
          </header>
          {confirmed.map((item) => (
            <Card key={item} title={item} />
          ))}
        </div>
        <div className={styles.boardContainer}>
          <header>
            <p>Reunião agendada</p>
          </header>
          {agend.map((item) => (
            <Card key={item} title={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
