interface CardHeaderProps {
  title: string;
}

const CardHeader = ({ title }: CardHeaderProps) => (
  <header>
    <p>{title}</p>
  </header>
);

export default CardHeader;
