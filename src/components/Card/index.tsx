import { useDrag } from 'react-dnd';
import styles from './styles.module.scss';

interface CardProps {
  title: string;
}
const Card = ({ title }: CardProps) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <div
      ref={dragRef}
      className={isDragging ? styles.isDragging : styles.container}
    >
      <p>{title}</p>
    </div>
  );
};

export default Card;
