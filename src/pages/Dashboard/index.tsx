import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useDrop } from 'react-dnd';
import { MdAdd } from 'react-icons/md';
import styles from './styles.module.scss';
import Card from '../../components/Card';
import { LeadContext } from '../../context/leadContext';
import Header from '../../components/Header';
import CardHeader from '../../components/CardHeader';

const Dashboard = () => {
  const { leads, confirmedData, scheduledData } = useContext(LeadContext);

  const [, dropConfirmed] = useDrop(() => ({
    accept: 'CONFIRMED'
  }));
  const [, dropScheduled] = useDrop(() => ({
    accept: 'SCHEDULED'
  }));

  return (
    <div className={styles.dashboardContainer}>
      <Header />
      <div className={styles.panelHeader}>
        <button type="button" className={styles.addLead}>
          <Link to="/newlead">
            <span>Novo Lead</span>
            <MdAdd size={20} />
          </Link>
        </button>
        <h3>Painel de Leads</h3>
      </div>
      <div className={styles.board}>
        <div className={styles.boardContainer}>
          <CardHeader title="Cliente em potencial" />
          {leads.map((item) => (
            <Card key={item.name} lead={item} type="CONFIRMED" />
          ))}
        </div>
        <div className={styles.boardContainer} ref={dropConfirmed}>
          <CardHeader title="Dados Confirmados" />
          {confirmedData.map((item) => (
            <Card key={item.id} lead={item} type="SCHEDULED" />
          ))}
        </div>
        <div className={styles.boardContainer} ref={dropScheduled}>
          <CardHeader title="Reunião Agendada" />
          {scheduledData.map((item) => (
            <Card key={item.id} lead={item} type="NONE" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
