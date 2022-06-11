import styles from '../styles.module.css';

const EventDate = ({ date }: { date: number }) => {
  const convertedDate = new Date(date);
  const formattedDate = `${convertedDate.getDate()} ${convertedDate.toLocaleString(
    'default',
    { month: 'short' }
  )}`;
  return <p className={styles.eventDate}>{formattedDate}</p>;
};

export default EventDate;
