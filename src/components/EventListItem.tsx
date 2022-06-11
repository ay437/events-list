import styles from '../styles.module.css';
import Blockies from 'react-blockies';
import EventMessage from './EventMessage';
import EventDate from './EventDate';
import { ColonyEventLog } from '../utils/types';

const EventListItem = ({
  eventLog,
  key
}: {
  eventLog: ColonyEventLog;
  key: number;
}) => {
  return (
    <li className={styles.eventsListItem} key={key}>
      <div className={styles.avatar}>
        <Blockies
          seed={
            eventLog.userAddress ||
            eventLog.address ||
            eventLog.values.blockHash
          }
          size={12.3}
          scale={3}
          color="#dfe"
          bgColor="#ffe"
          spotColor="#abc"
          className="identicon"
        />
      </div>
      <div>
        <div className={styles.userData}>
          <EventMessage eventLog={eventLog} />
          <div>
            <EventDate date={eventLog.logTime} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default EventListItem;
