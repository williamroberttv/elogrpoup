/* eslint-disable prettier/prettier */
import { useContext } from 'react';
import { useDrag } from 'react-dnd';
import { MdDragIndicator } from 'react-icons/md';
import { LeadContext } from '../../context/leadContext';
import { Leads } from '../../utils/types';
import styles from './styles.module.scss';

interface CardProps {
  lead: Leads;
  type: string;
}

const Card = ({ lead, type }: CardProps) => {
  const { id } = lead;
  // eslint-disable-next-line max-len
  const { leads, confirmedData, handleConfirmedData, handleScheduledData } = useContext(LeadContext);

  const filteredLead = leads.filter((arr) => arr.id === id);
  const filteredConfirmed = confirmedData.filter((arr) => arr.id === id);
  const [{ isDragging }, dragRef] = useDrag({
    type,
    item: { id },
    end: (item) => {
      if (item && type === 'CONFIRMED') {
        handleConfirmedData(filteredLead);
      } else {
        handleScheduledData(filteredConfirmed);
      }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <div
      ref={dragRef}
      className={isDragging ? styles.isDragging : styles.container}
    >
      <p>{lead.name}</p>
      <MdDragIndicator size={20} />
    </div>
  );
};

export default Card;
